import { Table as MantineTable } from '@mantine/core';

export function Table({ elements = null, header = null, ...others }) {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
    </tr>
  ));

  if (header) {
    header = (
      <tr>
        {header.map((element) => (
          <th key={element}>{element}</th>
        ))}
      </tr>
    );
  }

  return (
    <MantineTable {...others}>
      {header && <thead>{header}</thead>}
      <tbody>{rows}</tbody>
    </MantineTable>
  );
}

export default Table;
