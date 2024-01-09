import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    p: 4,
};

  
export default function Price(props) {
    const [open, setOpen] = useState(false);
    const [textValue, setTextValue] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = () => {
        fetch('http://wrenchcommserverahdfkljhaskjfhlkajhf.loca.lt/price', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "bypass-tunnel-reminder": true
            },
            body: JSON.stringify({
                price: parseInt(textValue),
                for: props.for
            })
        }).then(() => {
            setTextValue("");
            setOpen(false);
        })
    }

    const handleChange = e => {
        setTextValue(e.target.value);
    }

    return (
        <div style={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Submit Commission Price
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please Specify The Price Of The Project Below!
                    </Typography><br/>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                            onChange={handleChange}
                            value={textValue}
                        />
                    </FormControl>
                    <br/><br/>
                    <div style={{width: "100%", height: 30.75, position: "relative"}}>
                        <Button size="small" onClick={() => submit()}>Submit Price</Button>
                    </div>
                </Box>
            </Modal>
            {
            props.value === undefined || props.value === "0" || props.value === 0 ?
            
            <Button size={"small"} onClick={() => setOpen(true)}>Set Price</Button>
            :
            <div style={{color: "#90CAF9", fontSize: "14px"}}>
                ${props.value}.00 USD
            </div>
        }
        </div>
    )
}