import React from "react";
import { Box, Button, Container, Header, Image, Text } from "@mantine/core";

const hrefLink = "https://lucacadalora.com";

export const TravelucaHeader: React.FC = () => {
  return (
    <Header height={60} p={"md"}>
      <Container
        size="xs"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <a
          href={hrefLink}
          style={{
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            focusable="false"
            color="rgb(119, 119, 119)"
            style={{
              userSelect: "none",
              width: "100%",
              height: "100%",
              display: "inline-block",
              fill: "rgb(119, 119, 119)",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <g color="rgb(119, 119, 119)">
              <path d="M215.8,118.2a8,8,0,0,0-5-5.7L153.2,90.9l14.6-73.3a8.1,8.1,0,0,0-4.1-8.7,7.9,7.9,0,0,0-9.5,1.6l-112,120a7.9,7.9,0,0,0-2,7.3,8.2,8.2,0,0,0,5,5.7l57.6,21.6L88.2,238.4a8.1,8.1,0,0,0,4.1,8.7,8.4,8.4,0,0,0,3.7.9,7.9,7.9,0,0,0,5.8-2.5l112-120A7.9,7.9,0,0,0,215.8,118.2Z"></path>
            </g>
          </svg>
        </a>
        <Text
          ml="md"
          size="sm"
          component="a"
          href={hrefLink}
          sx={{
            letterSpacing: "2px",
          }}
        >
          LUCACADALORA.COM
        </Text>
      </Container>
    </Header>
  );
};
