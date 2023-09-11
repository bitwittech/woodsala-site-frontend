/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useReducer, useState } from "react";
import "../../asset/css/quotation.css";
import { Helmet } from "react-helmet";
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, InputAdornment, ListItemText, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import quotation from "../../asset/images/quotation/quotation.jpeg";
import ImageUploader from "../utility/ImageUploader";
import { getMiscellaneous, getProductList, placeQuotation } from "../../service/service"
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { setAlert } from "../../Redux/action/action";
const Quotation = () => {
    const dispatch = useDispatch();
    const initialState = {
        form: "None",
        SKU: "",
        title: "",
        length: 0,
        breadth: 0,
        height: 0,
        cus_upholstery: false,
        cus_upholstery_note: "",
        cus_design: false,
        cus_design_note: "",
        cus_polish: false,
        cus_polish_note: "",
        material: [],
    };
    const [localState, setLocalState] = useReducer(reducer, initialState);

    async function submitQuotation(partData) {
        try {
            const FD = new FormData;

            // let's collect the data and create final data object
            // polish
            if (localState.cus_polish) {
                FD.append("cus_polish", true);
                FD.append("cus_polish_note", localState.cus_polish_note);
                FD.append("polish", "");
                partData.customPolish.data.review_images.map(row => FD.append("customPolishImage", row));
            }
            else {
                FD.append("cus_polish", false)
                FD.append("cus_polish_note", "")
                FD.append("polish", localState.polish);
            }
            // upholstery
            if (localState.cus_upholstery) {
                FD.append("cus_upholstery", true);
                FD.append("cus_upholstery_note", localState.cus_upholstery_note);
                FD.append("upholstery", "");
                partData.customUpholster.data.review_images.map(row => FD.append("customUpholsteryImage", row));
            }
            else {
                FD.append("cus_upholstery", false)
                FD.append("cus_upholstery_note", "")
                FD.append("upholstery", localState.upholstery);
            }
            // upholstery
            if (localState.cus_design) {
                FD.append("cus_design", true);
                FD.append("cus_design_note", localState.cus_design_note);
                partData.customDesign.data.review_images.map(row => FD.append("customDesignImage", row));
            }
            else {
                FD.append("cus_design_note", "");
                FD.append("cus_design", false)
            }
            localState.material.map(row => FD.append("material", row))
            FD.append("form", localState.form)
            FD.append("SKU", localState.SKU)
            FD.append("title", localState.title)
            FD.append("length", localState.length)
            FD.append("breadth", localState.breadth)
            FD.append("height", localState.height)

            const res = await placeQuotation(FD);

            if (res.data.status === 200)
            {
                dispatch(setAlert({
                    open: true, varian: "success", message: res.data.message
                }));
                setLocalState({
                    type : "Set_Val",
                    payload : initialState
                })
            }
                
        } catch (error) {
            dispatch(setAlert({
                open: true, varian: "error", message: "Something Went Wrong !!!"
            }))
        }

    }
    return (
        <>
            {/* helmet tag  */}
            <Helmet>
                <title>Quotation</title>
                <meta name="description" content="Woodsala cart and checkout page." />
            </Helmet>
            {/* helmet tag ends  */}

            {/* Banner */}
            <Grid container className="Banner">
                <Grid item xs={12}>
                    <Typography variant="h1">Quotation</Typography>
                </Grid>
            </Grid>
            {/* Banner Ends */}
            {/* Main Container */}
            <Grid container p={2} className="quotation-main-container" spacing={3}>
                <Grid item xs={12} md={6} className="quotation-text">
                    <Typography variant="h4">
                        Welcome to our Quotation Page, where we celebrate the beauty and
                        artistry of furniture that transcends time.
                    </Typography>
                    <Typography variant="h6" p={4}>
                        Welcome to our Quotation Page, where we celebrate the beauty and
                        artistry of furniture that transcends time. Here, we have curated a
                        collection of insightful quotes that reflect the essence of
                        furniture—more than just objects, they are pieces of our lives,
                        witnesses to our memories, and vessels of comfort and style.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={quotation} alt="test"></img>
                </Grid>
                <Grid item xs={12} mt={5}>
                    <StepBox />
                </Grid>
                <Grid item xs={12} mt={5}>
                    <QuotationForm state={localState} setState={setLocalState} submitQuotation={submitQuotation} />
                </Grid>
            </Grid>
            {/* Main Container Ends */}
        </>
    );
};

function StepBox() {
    return (
        <>
            <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }} p={1}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h3">
                        Get your dream furniture in 4 easy steps
                    </Typography>
                </Box>
                <Box className="step-box">
                    <Box className="step-box-child">
                        <Typography variant="h5" className="step-box-text">
                            Vision
                        </Typography>
                    </Box>
                    <Box className="step-box-child">
                        <Typography variant="h5" className="step-box-text">
                            Reach Out
                        </Typography>
                    </Box>
                    <Box className="step-box-child">
                        <Typography variant="h5" className="step-box-text">
                            Consults
                        </Typography>
                    </Box>
                    <Box className="step-box-child">
                        <Typography variant="h5" className="step-box-text">
                            Furniture
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

function QuotationForm({ state, setState, submitQuotation }) {
    function handleForm(type) {
        setState({
            type: "Set_Val",
            payload: {
                form: type,
            },
        });
    }
    function getBack() {
        setState({
            type: "Set_Val",
            payload: {
                form: "None",
                SKU: "",
                title: "",
                length: 0,
                breadth: 0,
                height: 0,
                cus_upholstery: false,
                cus_upholstery_note: "",
                cus_design: false,
                cus_design_note: "",
                cus_polish: false,
                cus_polish_note: "",
                material: []
            }
        })
    }
    return (
        <>
            <Grid container className="quotation-container">
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="h3">Quotation Form</Typography>
                </Grid>
                {state.form === "None" && (
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} sx={{ textAlign: "center" }} mt={5}>
                                <Typography variant="h4">Choose product</Typography>
                            </Grid>
                            <Grid
                                item
                                mt={5}
                                xs={12}
                                md={6}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => handleForm("existing")}
                                    size="large"
                                >
                                    Existing Product
                                </Button>
                            </Grid>
                            <Grid
                                item
                                mt={5}
                                xs={12}
                                md={6}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => handleForm("custom")}
                                    size="large"
                                >
                                    Custom Product
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {state.form === "existing" && (
                    <Grid item xs={12}>
                        <Existing getBack={getBack} setState={setState} state={state} submitQuotation={submitQuotation} />
                    </Grid>
                )}
                {state.form === "custom" && (
                    <Grid item xs={12}>
                        <Custom getBack={getBack} setState={setState} state={state} submitQuotation={submitQuotation} />
                    </Grid>
                )}
            </Grid>
        </>
    );
}

// form Existing

function Existing({ state, setState, getBack, submitQuotation }) {

    useEffect(() => {
        setPresetVal()
    }, [state.SKU])

    useEffect(() => {
        handleMiscellaneous()
    }, [])

    // checked values
    const check = ["cus_upholstery", "cus_design", "cus_polish"]

    // catalog state for select fields
    const [List, setList] = useState({
        product: [],
        upholstery: [],
        material: [],
        polish: [],
    })

    const [customPolish, setCusPolish] = useState({
        data: {
            review_images: []
        }
    })
    const [customDesign, setCusDesign] = useState({
        data: {
            review_images: []
        }
    })
    const [customUpholster, setCusUpholster] = useState({
        data: {
            review_images: []
        }
    })

    // fetch the dropdown data
    async function handleMiscellaneous(params) {
        const res = await getMiscellaneous();
        setList(old => ({ ...old, upholstery: [...res.data.data.upholstery], material: [...res.data.data.material], polish: [...res.data.data.polish] }))
    }
    // for set up default attribute values like title and size
    function setPresetVal() {
        const data = List.product.find(row => state.SKU === row.SKU) || {};
        console.log(data)
        setState({
            type: "Set_Val",
            payload: {
                title: data.product_title || "",
                length: data.length_main || 0,
                breadth: data.breadth || 0,
                height: data.height || 0,
            }
        })
    }
    // field value handler
    function handleVal(e) {
        if (check.includes(e.target.name))
            setState({
                type: "Set_Val",
                payload: {
                    [e.target.name]: e.target.checked
                }
            })
        else
            setState({
                type: "Set_Val",
                payload: {
                    [e.target.name]: e.target.value
                }
            })
    }
    // product ID search
    async function handleSearch(e) {
        const delayDebounceFn = setTimeout(() => {
            getProductList(e.target.value)
                .then((res) => {
                    setList(old => ({ ...old, product: [...res.data.data] }));
                })
                .catch(() => {
                    setList(old => ({ ...old, product: [] }));
                });
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }

    // final submissions
    function handleSubmit() {
        submitQuotation({ customDesign, customPolish, customUpholster })
    }

    return <>
        <Grid container>
            <Grid item xs={12} >
                <Button startIcon={<ArrowBackIcon />} onClick={getBack} size="small">Back</Button>
                <Box mt={3} p={2}>
                    <Typography variant="h4">Existing Product</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} p={2}>
                <Grid container spacing={2}>
                    {/* // Form */}
                    <Grid item xs={12} md={6}>
                        <Box className={"quotation-form"}>
                            <Typography variant="h6">Search Product</Typography>
                            <Autocomplete
                                disablePortal
                                size="small"
                                fullWidth
                                noOptionsText={"ex : P-01001"}
                                //   multiple
                                autoHighlight
                                id="combo-box-demo"
                                options={List.product.map((row) => {
                                    return row.SKU;
                                })}
                                renderInput={(params) => (
                                    <TextField
                                        onKeyUpCapture={handleSearch}
                                        value={state.SKU || ""}
                                        {...params}
                                        label="Product SKU"
                                    />
                                )}
                                onChange={(e, newMember) =>
                                    setState({
                                        type: "Set_Val",
                                        payload: {
                                            SKU: newMember
                                        }
                                    })
                                }
                            />
                            <TextField disabled label="Product Title" size="small" value={state.title || ""} />
                            {/* Size=================== */}
                            <Typography variant="h6">Size</Typography>
                            <TextField name="length" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Length" size="small" value={state.length || 0} />
                            <TextField name="breadth" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Breadth" size="small" value={state.breadth || 0} />
                            <TextField name="height" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Height" size="small" value={state.height || 0} />
                            {/* Polish================= */}
                            <Typography variant="h6">Polish</Typography>
                            {!state.cus_polish ? <TextField
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="polish"
                                label="polish"
                                multiple
                                value={state.polish}
                                onChange={handleVal}
                                helperText="Please select your upholstery."
                            >
                                {List.polish.map(
                                    (option) =>
                                        <MenuItem
                                            key={option.polish_name}
                                            value={option.polish_name}
                                        >
                                            {option.polish_name}
                                        </MenuItem>
                                )
                                }
                                <MenuItem key={"none"} value="None">
                                    {"None"}
                                </MenuItem>
                            </TextField> :
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusPolish} state={customPolish}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize style={{ width: "100%", resize: "none" }} name="cus_polish_note"
                                        placeholder="Note For Polish" minRows={5} maxRows={5} onChange={handleVal} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_polish" onChange={handleVal} />} label="Add custom polish" />
                            </FormGroup>
                            {/* Upholstery================= */}
                            <Typography variant="h6">Upholstery</Typography>
                            {!state.cus_upholstery ? <TextField
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="upholstery"
                                label="Upholstery"
                                multiple
                                value={state.upholstery}
                                onChange={handleVal}
                                helperText="Please select your upholstery."
                            >
                                {List.upholstery.map(
                                    (option) =>
                                        <MenuItem
                                            key={option.title}
                                            value={option.title}
                                        >
                                            {option.title}
                                        </MenuItem>
                                )
                                }
                                <MenuItem key={"none"} value="None">
                                    {"None"}
                                </MenuItem>
                            </TextField> :
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusUpholster} state={customUpholster}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize onChange={handleVal} style={{ width: "100%", resize: "none" }} name="cus_upholstery_note"
                                        placeholder="Note For Upholstery" minRows={5} maxRows={5} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_upholstery" onChange={handleVal} />} label="Add custom upholstery" />
                            </FormGroup>
                            {/* Material===================== */}
                            <Typography variant="h6">Material</Typography>
                            <Select
                                multiple
                                fullWidth
                                value={state.material}
                                name="material"
                                onChange={handleVal}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {List.material.map((option) => (
                                    <MenuItem
                                        key={option._id}
                                        value={option.primaryMaterial_name}
                                    >
                                        <Checkbox
                                            checked={
                                                state.material.indexOf(
                                                    option.primaryMaterial_name
                                                ) > -1
                                            }
                                        />
                                        <ListItemText
                                            primary={option.primaryMaterial_name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Custom Design================= */}
                            <Typography variant="h6">Any Custom Design</Typography>
                            {state.cus_design &&
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusDesign} state={customDesign}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize onChange={handleVal} style={{ width: "100%", resize: "none" }} name="cus_design_note"
                                        placeholder="Note For Custom Design" minRows={5} maxRows={5} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_design" onChange={handleVal} />} label="Add custom design" />
                            </FormGroup>
                            {/* Button for submission================ */}
                            <Box sx={{ display: 'flex', justifyContent: "right" }}>
                                <Button onClick={handleSubmit} startIcon={<SendIcon />} variant="contained" size="small">Send Query</Button>
                            </Box>
                        </Box>
                    </Grid>
                    {/* Side Image  */}
                    <Grid item xs={12} md={6}>
                        <img src={quotation} alt="sideImage"></img>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>;
}

// form Custom

function Custom({ state, setState, getBack, submitQuotation }) {
    // checked values use while saving the value as bool
    const check = ["cus_upholstery", "cus_design", "cus_polish"]

    useEffect(() => {
        setPresetVal()
    }, [state.SKU])

    useEffect(() => {
        handleMiscellaneous()
    }, [])

    const [List, setList] = useState({
        product: [],
        upholstery: [],
        material: [],
        polish: [],
    })

    const [customPolish, setCusPolish] = useState({
        data: {
            review_images: []
        }
    })

    const [customDesign, setCusDesign] = useState({
        data: {
            review_images: []
        }
    })
    const [customUpholster, setCusUpholster] = useState({
        data: {
            review_images: []
        }
    })

    async function handleMiscellaneous(params) {
        const res = await getMiscellaneous();
        setList(old => ({ ...old, upholstery: [...res.data.data.upholstery], material: [...res.data.data.material], polish: [...res.data.data.polish] }))
    }

    function setPresetVal() {
        const data = List.product.find(row => state.SKU === row.SKU) || {};
        console.log(data)
        setState({
            type: "Set_Val",
            payload: {
                title: data.product_title,
                length: data.length_main,
                breadth: data.breadth,
                height: data.height,
            }
        })
    }

    function handleVal(e) {
        if (check.includes(e.target.name))
            setState({
                type: "Set_Val",
                payload: {
                    [e.target.name]: e.target.checked
                }
            })
        else
            setState({
                type: "Set_Val",
                payload: {
                    [e.target.name]: e.target.value
                }
            })
    }

   // final submissions
   function handleSubmit() {
    submitQuotation({ customDesign, customPolish, customUpholster })
}

    return <>
        <Grid container>
            <Grid item xs={12} >
                <Button startIcon={<ArrowBackIcon />} onClick={getBack} size="small">Back</Button>
                <Box mt={3} p={2}>
                    <Typography variant="h4">Create A Custom Product</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} p={2}>
                <Grid container spacing={2}>
                    {/* Form  */}
                    <Grid item xs={12} md={6}>
                        <Box className={"quotation-form"}>
                            <TextField name={"title"} onChange={handleVal} label="Product Title" size="small" value={state.title || ""} />
                            {/* Size=================== */}
                            <Typography variant="h6">Size</Typography>
                            <TextField name="length" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Length" size="small" value={state.length || 0} />
                            <TextField name="breadth" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Breadth" size="small" value={state.breadth || 0} />
                            <TextField name="height" onChange={handleVal} InputProps={{
                                startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                            }} type="number" label="Height" size="small" value={state.height || 0} />
                            {/* Polish================= */}
                            <Typography variant="h6">Polish</Typography>
                            {!state.cus_polish ? <TextField
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="polish"
                                label="polish"
                                multiple
                                value={state.polish}
                                onChange={handleVal}
                                helperText="Please select your upholstery."
                            >
                                {List.polish.map(
                                    (option) =>
                                        <MenuItem
                                            key={option.polish_name}
                                            value={option.polish_name}
                                        >
                                            {option.polish_name}
                                        </MenuItem>
                                )
                                }
                                <MenuItem key={"none"} value="None">
                                    {"None"}
                                </MenuItem>
                            </TextField> :
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusPolish} state={customPolish}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize onChange={handleVal} style={{ width: "100%", resize: "none" }} name="cus_polish_note"
                                        placeholder="Note For Polish" minRows={5} maxRows={5} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_polish" onChange={handleVal} />} label="Add custom polish" />
                            </FormGroup>
                            {/* Upholstery================= */}
                            <Typography variant="h6">Upholstery</Typography>
                            {!state.cus_upholstery ? <TextField
                                size="small"
                                fullWidth
                                id="outlined-select"
                                select
                                name="upholstery"
                                label="Upholstery"
                                multiple
                                value={state.upholstery}
                                onChange={handleVal}
                                helperText="Please select your upholstery."
                            >
                                {List.upholstery.map(
                                    (option) =>
                                        <MenuItem
                                            key={option.title}
                                            value={option.title}
                                        >
                                            {option.title}
                                        </MenuItem>
                                )
                                }
                                <MenuItem key={"none"} value="None">
                                    {"None"}
                                </MenuItem>
                            </TextField> :
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusUpholster} state={customUpholster}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize onChange={handleVal} style={{ width: "100%", resize: "none" }} name="cus_upholstery_note"
                                        placeholder="Note For Upholstery" minRows={5} maxRows={5} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_upholstery" onChange={handleVal} />} label="Add custom upholstery" />
                            </FormGroup>
                            {/* Material===================== */}
                            <Typography variant="h6">Material</Typography>
                            <Select
                                multiple
                                fullWidth
                                value={state.material}
                                name="material"
                                onChange={handleVal}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {List.material.map((option) => (
                                    <MenuItem
                                        key={option._id}
                                        value={option.primaryMaterial_name}
                                    >
                                        <Checkbox
                                            checked={
                                                state.material.indexOf(
                                                    option.primaryMaterial_name
                                                ) > -1
                                            }
                                        />
                                        <ListItemText
                                            primary={option.primaryMaterial_name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Custom Design================= */}
                            <Typography variant="h6">Any Custom Design</Typography>
                            {state.cus_design &&
                                <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                                    <Box sx={{ border: "1px dotted brown", textAlign: "center", padding: "1rem" }}>
                                        <ImageUploader setData={setCusDesign} state={customDesign}></ImageUploader>
                                    </Box>
                                    <TextareaAutosize onChange={handleVal} style={{ width: "100%", resize: "none" }} name="cus_design_note"
                                        placeholder="Note For Custom Design" minRows={5} maxRows={5} />
                                </Box>
                            }
                            <FormGroup pl={1}>
                                <FormControlLabel control={<Checkbox size="small" name="cus_design" onChange={handleVal} />} label="Add custom design" />
                            </FormGroup>
                            {/* Button for submission================ */}
                            <Box sx={{ display: 'flex', justifyContent: "right" }}>
                                <Button onClick={handleSubmit} startIcon={<SendIcon />} variant="contained" size="small">Send Query</Button>
                            </Box>
                        </Box>
                    </Grid>
                    {/* Side Image */}
                    <Grid item xs={12} md={6}>
                        <img src={quotation} alt="sideImage"></img>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>;
}

export default Quotation;

// reducer
function reducer(state, action) {
    switch (action.type) {
        case "Set_Val":
            state = { ...state, ...action.payload }
            return state
        default:
            return state;
    }
}
