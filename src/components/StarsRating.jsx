import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Box, Flex } from '@mantine/core';

export function StarsRating({ stars = 5, ...others }) {
  const renderStars = [...Array(5)].map((__, index) => {
    let icon;
    let color;
    let colorIndex = 6;
    index = index + 1;
    // console.log('index : ', index);
    if (index <= stars) {
      icon = <BsStarFill />;
      color = 'yellow';
    } else if (index - stars < 1) {
      icon = <BsStarHalf />;
      color = 'yellow';
    }
    // else if (index < stars && stars - index < 0.5) {
    //   icon = <BsStarHalf />;
    //   color = 'yellow';
    // }
    else {
      icon = <BsStarFill />;
      color = 'lmsLayout';
      colorIndex = 3;
    }

    return (
      <Box key={index} sx={(theme) => ({ color: theme.colors[color][colorIndex] })}>
        {icon}
      </Box>
    );
  });

  return (
    <Flex align="center" {...others}>
      {renderStars}
    </Flex>
  );
}

export default StarsRating;
