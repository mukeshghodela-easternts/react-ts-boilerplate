import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import LeftBar from './LeftBar';
import DropdownMenu from './DropdownMenu';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="lg">
        <Card sx={{ p: 10, mb: 10, mt: 10, borderRadius: 12 }}>
          <LeftBar></LeftBar>
          {/* <DropdownMenu></DropdownMenu> */}
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
