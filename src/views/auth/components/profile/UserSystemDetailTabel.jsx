import { Table, Title } from '@mantine/core';
import { getUserSystemDetails } from 'user-detail-from-browser';
import { useOs } from '@mantine/hooks';

export function UserSystemDetailTabel() {
  const os = useOs();
  const userSystemeDetails = getUserSystemDetails();

  return (
    <>
      <Title order={6} px={8} underline sx={{ alignSelf: 'start' }}>
        Device Detail
      </Title>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <tbody>
          <tr>
            <td>Screen</td>
            <td>{userSystemeDetails.device.includes('Laptop') ? 'Desktop' : 'Mobile'}</td>
          </tr>
          <tr>
            <td>Operating System</td>
            <td>{os}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{userSystemeDetails.RAM}</td>
          </tr>
          <tr>
            <td>Network Speed</td>
            <td>{userSystemeDetails.network}</td>
          </tr>
          <tr>
            <td>Logical Processors</td>
            <td>{userSystemeDetails.logical_processors}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserSystemDetailTabel;
