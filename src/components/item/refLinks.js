import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

export default function RefLinks(props) {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>Reference Links</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {props.links.map((v, i) => (
                    <div>
                        <a href={v} target="_blank" rel="noreferrer">Reference Link {i+1}</a>
                    </div>
                ))}
            </Typography>
            </AccordionDetails>
        </Accordion>
    )
}