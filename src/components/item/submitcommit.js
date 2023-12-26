import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
};


export default function SubmitCommit(props) {
    const [open, setOpen] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [commitType, setCommitType] = useState("reg")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = () => {
        fetch('http://localhost:7614/commit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: commitType,
                message: textValue,
                for: props.for
            })
        }).then(() => {
            setTextValue("");
            setCommitType("reg");
            setOpen(false);
        })
    }

    const handleCommit = e => {
        setCommitType(e.target.value);
    }

    const handleChange = e => {
        setTextValue(e.target.value);
    }

    return (
        <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit New Commit
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Describe The Changes in Detail Using the Space Provided Below!
            </Typography><br/>
            <TextField fullWidth multiline onChange={handleChange} /><br/><br/>
            <div style={{width: "100%", height: 30.75, position: "relative"}}>
                <Button size="small" onClick={() => submit()}>Submit Commit</Button>
                <Select
                    value={commitType}
                    onChange={handleCommit}
                    size="small"
                    style={{position: "absolute", top: "50%", transform: "translateY(-50%)", right: 0}}
                >
                    <MenuItem value={"reg"}>Regular</MenuItem>
                    <MenuItem value={"del"}>Delay</MenuItem>
                    <MenuItem value={"oth"}>Other</MenuItem>
                </Select>
            </div>
        </Box>
        </Modal>
        <Button size="small" onClick={() => handleOpen()}>Add New Commit</Button>
        </>
        
    )
}