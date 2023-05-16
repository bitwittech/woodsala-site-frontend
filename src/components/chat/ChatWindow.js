import React, { useEffect, useState } from "react";
import "../../asset/css/chat.css";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import { Chat, Close, Send } from "@mui/icons-material";
// logo
import logo from "../../asset/images/logo.webp";
// Socket
import Socket from "../../socket/Socket";
import { useSelector } from "react-redux";

const ChatWindow = () => {
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState("");

  // state
  const { auth, socket, message } = useSelector((state) => state);

  function handleMessage(e) {
    setReply(e.target.value);
  }

  function handleSendMessage() {
    Socket.Send_Message({
      from: socket.id,
      sender_mail: auth.email,
      message: reply,
    });
    setChat((old) => [
      ...old,
      {
        type: "reply",
        message: reply,
      },
    ]);
    setReply("");
  }

  useEffect(() => {
    if (message.receiver_email === auth.email) {
      setChat((old) => [
        ...old,
        {
          type: "message",
          message: message.message,
        },
      ]);
    }
  }, [message]);

  return (
    <Box className="chat-wrapper">
      {/* // Chat Box */}
      {show && (
        <Box className="chat-box">
          <Box className="chat-box-header">
            <img src={logo} alt="logo" />
          </Box>
          {/* // Chat Box */}
          <Box className="chat-box-display-wrapper">
            <Box className="chat-box-display">
              {chat.map((row, i) =>
                row.type === "message" ? (
                  <Box key={i} className="chat-box-message">
                    {row.message}
                  </Box>
                ) : (
                  <Box key={i} className="chat-box-message-right">
                    {row.message}
                  </Box>
                )
              )}
            </Box>
          </Box>
          {/* {Chat TextFiled} */}
          <Box className="chat-box-textfield-wrapper">
            <Box className="chat-box-textfield">
              <TextField
                fullWidth
                size="small"
                placeholder="Ask us anything..."
                variant="standard"
                value={reply}
                onChange={handleMessage}
              />
            </Box>
            <Button
              onClick={handleSendMessage}
              variant="outlined"
              className="chat-box-button"
              size="small"
            >
              <Send />
            </Button>
          </Box>
        </Box>
      )}
      {/* // Chat Button */}
      {!show ? (
        <Tooltip title="Chat">
          <Button
            sx={{ borderRadius: "100px" }}
            onClick={() => setShow(true)}
            size="large"
            variant="contained"
          >
            <Chat />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Close">
          <Button
            sx={{ borderRadius: "100px" }}
            onClick={() => setShow(false)}
            size="large"
            variant="outlined"
          >
            <Close />
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default ChatWindow;
