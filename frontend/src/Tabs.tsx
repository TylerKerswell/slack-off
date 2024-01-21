import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}




function SummaryPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>

  )
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface Json {
  summary: any,
  def: any,
  problems: any,
}

export function CenteredTabs(props: Json) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const ListOfBulletpoints = Object.values(props.summary).map((d: any, index) => <span key={index} className="sumtext">{d}</span>)
  const ListOfDefs = Object.values(props.def).map((d: any, index) => <div className="deftext" key={index}><span>{d}</span></div>)
  const ListOfProblems = Object.values(props.problems).map((d: any, index) => <div className="probtext" key={index}><span>{d}</span></div>)

  return (

    <div className='tabs'>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs className='tabs-container' value={value} onChange={handleChange} centered >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Explanation + Resources" {...a11yProps(1)} />
          <Tab label="Study Plan" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <SummaryPanel value={value} index={0}>
        <div className="tabsrim">
          <div id='bulletwrapper'>
            <h3>Summary</h3>
            <>{ListOfBulletpoints}</>
          </div>
        </div>
      </SummaryPanel>

      <SummaryPanel value={value} index={1}>
        <div className="tabsrim">
          <div id='defwrapper'>
            <h3>Explanation + Resources</h3>
            <>{ListOfDefs}</>
          </div>
        </div>
      </SummaryPanel>
      <SummaryPanel value={value} index={2}>
        <div className="tabsrim">
          <div id="probwrapper">
            <h3>Study Plan + Resources</h3>
            <>{ListOfStudy}</>
            <h3>Practice Problems</h3>
            <h3>Study Plan</h3>
            <>{ListOfProblems}</>
          </div>
        </div>
      </SummaryPanel>

    </div>

  );
}