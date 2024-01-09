import { Card } from "@mui/material";
import BoardSectionList from "./components/BoardSectionList";

export default function Page(props) {
    return (
        <div>
            <img src="./header.png" alt="header" style={{position: "relative", left: "50%", transform: "translateX(-50%)", maxWidth: "75%", marginBottom: "20px"}} />
            <BoardSectionList />
            
        </div>
        
    )
}