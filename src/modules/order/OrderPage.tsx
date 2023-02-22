import {
  AppShell,
  Button,
  Checkbox,
  Container, Paper,
  SimpleGrid,
  Stack,
  TextInput
} from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";

import React from "react";
import { TravelucaHeader } from "src/components/header";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  isSwearing: false,
};

const validateFn = {
  firstName: isNotEmpty("Masukkan nama depan"),
  lastName: isNotEmpty("Masukkan nama belakang"),
  email: isEmail("Masukan email yang valid"),
  phoneNumber: matches(
    /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
    // /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    "Masukan nomor telepon yang valid",
  ),
};

export const OrderPage: React.FC = () => {
  const form = useForm({
    initialValues,
    validate: validateFn,
  });

  const handleSubmit = form.onSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <AppShell
      header={<TravelucaHeader />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] },
      })}
    >
      <Container
        size="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          mt="lg"
          p="lg"
          shadow="md"
          sx={{
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="lg">
              <SimpleGrid cols={2}>
                <TextInput
                  withAsterisk
                  label="Nama Depan"
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  withAsterisk
                  label="Nama Belakang"
                  {...form.getInputProps("lastName")}
                />
              </SimpleGrid>
              <TextInput
                withAsterisk
                type="email"
                label="Email"
                {...form.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Nomor Telepon"
                {...form.getInputProps("phoneNumber")}
              />
              <Checkbox
                label="Saya bersumpah, tidak akan merubah password, membagikan/menjual lagi account ini untuk keuntungan pribadi."
                {...form.getInputProps("isSwearing", { type: "checkbox" })}
              />
              <Button disabled={!form.values.isSwearing} type="submit">
                Beli akun ChatGPT Plus
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </AppShell>
  );
};
