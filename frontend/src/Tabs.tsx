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

export function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

//   render: function() {

//     var styles = {
//       default_tab:{
//         color: Colors.grey500,
//         backgroundColor: Colors.grey50,
//         fontWeight: 400,
//       },
//       active_tab:{
//         color: Colors.deepOrange700,
//       }
//     }
  
//     styles.tab = []
//     styles.tab[0] = styles.default_tab;
//     styles.tab[1] = styles.default_tab;
//     styles.tab[2] = styles.default_tab;
//     styles.tab[this.state.slideIndex] = objectAssign({},   styles.tab[this.state.slideIndex], styles.active_tab);
//   }  

  return (
    <div className='tabs'>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
<<<<<<< HEAD
        <Tabs className='tabs-container' 
                value={value} 
                onChange={handleChange} 
                centered 
                sx={{
                    "& button": {borderRadius: 2}
                    "& button:hover": { backgroundColor: '#004080'}
                }}>
          <Tab label="Summary" {...a11yProps(0)}/>
          <Tab label="Explanation + Resources" />
          <Tab label="Study Plan" />
=======
        <Tabs value={value} onChange={handleChange} centered>
          <Tab className='tab' label="Summary"  {...a11yProps(0)} />
          <Tab className='tab' label="Explanation + Resources" {...a11yProps(1)}/>
          <Tab className='tab' label="Study Plan" {...a11yProps(2)}/>
>>>>>>> 48b685b554f533b22d42f49cd9911a7def724506
        </Tabs>
      </Box>
      <SummaryPanel value={value} index={0}>
        <div>
          <h3>Topic</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, delectus. Expedita dolorum
            officia at est molestias quod amet dolorem excepturi laborum! Qui alias maiores consequuntur tempore aut
            aliquam suscipit nemo.</p>
        </div>
      </SummaryPanel>
      <SummaryPanel value={value} index={1}>
        <div>
          <h3>Topic</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, delectus. Expedita dolorum
            officia at est molestias quod amet dolorem excepturi laborum! Qui alias maiores consequuntur tempore aut
            aliquam suscipit nemo.</p>
        </div>
      </SummaryPanel>
      <SummaryPanel value={value} index={2}>
        <div>
          <h3>Topic</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, delectus. Expedita dolorum
            officia at est molestias quod amet dolorem excepturi laborum! Qui alias maiores consequuntur tempore aut
            aliquam suscipit nemo.</p>
        </div>
      </SummaryPanel>

    </div>
  );
}