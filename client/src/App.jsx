import { Button, Stack } from 'react-bootstrap';

function App() {
  return (
    <>
      <Stack direction="horizontal" gap={2}>
        <Button as="a" variant="primary">
          Button as link
        </Button>
        <Button as="a" variant="success">
          Button as link
          <i class="bi bi-alarm"></i> 
        </Button>
      </Stack>
    </>
  )
}

export default App
