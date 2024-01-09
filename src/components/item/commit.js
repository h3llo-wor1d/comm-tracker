import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { useState } from 'react';

const typemap = {
    "reg": "Regular",
    "del": "Delay",
    "oth": "Other"
}

export default function Commit(props) {
    const c = props.details;
    const [buttonText, setButtonText] = useState("Delete Commit");
    const [shouldDelete, setShouldDelete] = useState(false);

    const deleteCommit = async () => {
        if (shouldDelete) {
            // delete the commit, sort by timestamp on bot
            console.log("deleting it...")
            await fetch(`http://wrenchcommserverahdfkljhaskjfhlkajhf.loca.lt/deleteCommit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": true
                },
                body: JSON.stringify({
                    "for": props.for,
                    "when": c.when
                })
            })
            // do delete logic
            window.location = "/";
            return;
        }
        setButtonText("Are You Sure?");
        setShouldDelete(true);
    }

    return (
        <Accordion style={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>
                {typemap[c.type]} Commit @ {
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
                .format(c.when*1000)
                }
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {c.message}
            </Typography>
            </AccordionDetails>
            <AccordionActions>
                <Button size={"small"} onClick={deleteCommit}>{buttonText}</Button>
            </AccordionActions>
        </Accordion>
    )
}