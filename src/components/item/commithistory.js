import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Commit from './commit';

export default function CommitHistory(props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>Commit History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    props.details.map(c => <Commit details={c} for={props.for}/>)
                }
            </AccordionDetails>
            
        </Accordion>
    )
}