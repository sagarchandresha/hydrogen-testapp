import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
    <h2 className="block text-center text-3xl text-cyan-800 uppercase font-bold pb-3">Frequently Ask Question</h2>
      <Accordion className="!border !border-b-black !mb-1 !bg-transparent !shadow-none before:hidden" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="px-12"
        >
          <Typography>Can I place an order at your website?</Typography>
        </AccordionSummary>
        <AccordionDetails className="px-12">
          <Typography>
          No. You may browse our catalogue on the website, but would have to get in touch with us at our boutique to place an order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="border border-b-black mb-1 bg-transparent shadow-none before:hidden" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="px-12"
        >
          <Typography>Do you keep jewellery on display?</Typography>
        </AccordionSummary>
        <AccordionDetails className="px-12">
          <Typography>
          Yes. Showcasing Gehna’s original designs and unique aesthetics, we constantly add new creations to the in-house Gehna Exclusives.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="border border-b-black mb-1 bg-transparent shadow-none before:hidden" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="px-12"
        >
          <Typography>Do you have any gold savings schemes?</Typography>
        </AccordionSummary>
        <AccordionDetails className="px-12">
          <Typography>
          Yes, we have gold savings schemes under “Swarna Sampathi”.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Faq;
