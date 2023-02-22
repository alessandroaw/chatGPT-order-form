import {
  AppShell,
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { FaAt, FaPhone } from "react-icons/fa";

import React from "react";
import { TravelucaHeader } from "src/components/header";
import { useSetState } from "@mantine/hooks";
import { TravelucaFooter } from "src/components/footer";

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
    "Masukan nomor telepon yang valid"
  ),
};

export const OrderPage: React.FC = () => {
  const [state, setState] = useSetState({
    loading: false,
    success: false,
    error: false,
  });

  const form = useForm({
    initialValues,
    validate: validateFn,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    let phoneNumberFmt = values.phoneNumber;

    setState({
      loading: true,
    });

    if (values.phoneNumber.startsWith("0")) {
      phoneNumberFmt = "+62" + values.phoneNumber.slice(1);
    }

    if (values.phoneNumber.startsWith("62")) {
      phoneNumberFmt = "+" + values.phoneNumber;
    }

    // const delay = (ms: number) =>
    //   new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000); /// waiting 1 second.

    // alert(
    //   JSON.stringify({ ...values, newPhoneNumber: phoneNumberFmt }, null, 2)
    // );

    setState({
      loading: false,
    });
  });

  return (
    <AppShell
      header={<TravelucaHeader />}
      footer={<TravelucaFooter />}
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
            <Box mb="xl">
              <Text weight="bold" size="xl" align="center">
                Form pembelian akun ChatGPT Plus
              </Text>
            </Box>
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
                label="Email"
                type="email"
                icon={<FaAt />}
                {...form.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Nomor Telepon"
                icon={<FaPhone />}
                {...form.getInputProps("phoneNumber")}
              />
              <Checkbox
                label="Saya bersumpah, tidak akan merubah password, membagikan/menjual lagi account ini untuk keuntungan pribadi."
                {...form.getInputProps("isSwearing", { type: "checkbox" })}
              />
              <Button
                loading={state.loading}
                disabled={!form.values.isSwearing}
                type="submit"
              >
                Beli akun ChatGPT Plus
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </AppShell>
  );
};
