
import {Routes,Route} from 'react-router-dom';
import Settings from './pages/Settings';
import Questions from './pages/Questions';
import Score from './pages/FinalScreen';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';


function App() {
  
  return (
    
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={5}>
        <Routes>
          <Route path="/" 
          element={
            <>
              <Typography variant='h2' fontWeight='bold'>Quiz App</Typography>
              <Settings />
            </>
          } />
          <Route path="/questions" element={<Questions />} />
          <Route path="/score" element={<Score />} />
        </Routes>
        </Box>
      </Container>
    
  );
}

export default App;
