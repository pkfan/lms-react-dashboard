import { Table, Title } from '@mantine/core';
import { getUserSystemDetails } from 'user-detail-from-browser';

export function UserSystemDetailTabel() {
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
            <td>OS</td>
            <td>{userSystemeDetails.operating_system}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{userSystemeDetails.RAM}</td>
          </tr>
          <tr>
            <td>Network</td>
            <td>{userSystemeDetails.network}</td>
          </tr>
          <tr>
            <td>Processors</td>
            <td>{userSystemeDetails.logical_processors}</td>
          </tr>
          <tr>
            <td>Platform</td>
            <td>{userSystemeDetails.platform}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserSystemDetailTabel;
