import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ links }) {
  const items = links.map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <MantineBreadcrumbs separator=">">{items}</MantineBreadcrumbs>
    </>
  );
}
