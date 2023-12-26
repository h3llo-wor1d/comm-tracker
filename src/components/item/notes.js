import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

export default function Notes(props) {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>Notes/Additional Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {props.details}
            </Typography>
            </AccordionDetails>
        </Accordion>
    )
}