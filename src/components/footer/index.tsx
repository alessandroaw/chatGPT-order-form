import { Container, Footer, Text } from "@mantine/core";
import React from "react";

export const TravelucaFooter: React.FC = () => {
  return (
    <Footer height={60} p={"md"}>
      <Container
        size="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text size="xs">© 2022 Luca Cada Lora - Jakarta</Text>
        <Text size="xs" component="a" href="mailto:mail@lucacadalora.com">
          mail@lucacadalora.com
        </Text>
      </Container>
    </Footer>
  );
};
