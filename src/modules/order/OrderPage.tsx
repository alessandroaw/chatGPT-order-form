import {
  AppShell,
  Box,
  Button,
  Checkbox,
  Container,
  Notification,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { FaAt, FaExclamation, FaPhone, FaUser } from "react-icons/fa";

import { useSetState } from "@mantine/hooks";
import React from "react";
import { TravelucaFooter } from "src/components/footer";
import { TravelucaHeader } from "src/components/header";
import { Order } from "src/models";
import { submitOrder } from "src/repositories/order";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profession: "",
  isSwearing: false,
  payCarbonFootprint: true,
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
  const inputRadius = "md";

  const [state, setState] = useSetState({
    loading: false,
    success: true,
    error: false,
  });

  const form = useForm({
    initialValues,
    validate: validateFn,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    let phoneNumberFmt = values.phoneNumber;

    setState({
      error: false,
      success: false,
      loading: true,
    });

    if (values.phoneNumber.startsWith("0")) {
      phoneNumberFmt = "+62" + values.phoneNumber.slice(1);
    }

    if (values.phoneNumber.startsWith("62")) {
      phoneNumberFmt = "+" + values.phoneNumber;
    }

    const order: Order = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: phoneNumberFmt,
      profession: values.profession,
      carbon_footprint: values.payCarbonFootprint,
    };

    try {
      const res = await submitOrder(order);
      setState({ success: true });
      window.location.replace(res.invoice_url);
    } catch (error) {
      console.log(error);
      setState({
        error: true,
        loading: false,
      });
    }
  });

  return (
    <AppShell
      header={<TravelucaHeader />}
      footer={<TravelucaFooter />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[1] },
      })}
    >
      <Container
        size="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.error && (
          <Notification
            icon={<FaExclamation />}
            title="Pemesanan Gagal"
            color="red"
            onClose={() => setState({ error: false })}
          >
            Terjadi kesalahan saat menghubungi server
          </Notification>
        )}
        <Paper
          mt="lg"
          p="lg"
          shadow="md"
          radius="lg"
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
                  radius={inputRadius}
                  withAsterisk
                  label="Nama Depan"
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  radius={inputRadius}
                  withAsterisk
                  label="Nama Belakang"
                  {...form.getInputProps("lastName")}
                />
              </SimpleGrid>
              <TextInput
                radius={inputRadius}
                withAsterisk
                label="Email"
                type="email"
                icon={<FaAt />}
                {...form.getInputProps("email")}
              />
              <TextInput
                radius={inputRadius}
                withAsterisk
                type="text"
                label="Nomor Telepon"
                icon={<FaPhone />}
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
                radius={inputRadius}
                type="text"
                label="Profesi (opsional)"
                icon={<FaUser />}
                {...form.getInputProps("profession")}
              />
              <Checkbox
                label="Pay Rp1.500 to offset your CO2 emission (Powered by CarbonShare)"
                {...form.getInputProps("payCarbonFootprint", { type: "checkbox" })}
              />
              <Checkbox
                label="Saya bersumpah, tidak akan mengubah password, membagikan/menjual kembali akun ini untuk keuntungan pribadi, dan tidak akan menghapus riwayat obrolan pengguna lain."
                {...form.getInputProps("isSwearing", { type: "checkbox" })}
              />
              <Button
                radius={inputRadius}
                loading={state.loading}
                disabled={!form.values.isSwearing}
                type="submit"
              >
                Beli akun ChatGPT Plus
              </Button>
              <Paper withBorder p="xs" radius="md">
                <Text size="xs">
                  Your order and data will be processed and shared with
                  lucacadalora.com under PT Traveluca Sejahtera Bersama for
                  product fulfillment and PT Sinar Digital Terdepan (Xendit.co)
                  as online payment gateway services. Carbon Purchase Removal powered by CarbonShare
                </Text>
              </Paper>
            </Stack>
          </form>
        </Paper>
      </Container>
    </AppShell>
  );
};
