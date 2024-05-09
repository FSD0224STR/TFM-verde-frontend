import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import "./formRegister.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormRegister() {
  let initialValuesForm = {
    name: "", //este valor es referente al name del input para que formik sepa donde tiene que cambiar con el onchange por eso tiene que ser igual
    lastname: "",
    email: "",
    role: "Leader",
    password: "",
    location: "",
    gender: "Female",
    age: "",
    imgProfile: "",
    description: "",
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Debes ingrensar un nombre"),
    email: Yup.string().required("Debes ingrensar un email"),
    password: Yup.string().required("Debes ingrensar un password"),
    gener: Yup.string().required("Debes ingrensar un genero"),
    age: Yup.string().required("Debes ingrensar una edad"),
    location: Yup.string().required("Debes ingrensar un ubicacion"),
  });

  const addNewUser = (data) => {
    console.log("entrando en el el submit");

    console.log(data);
  };

  const { handleChange, handleSubmit, setFieldValue, values, errors } =
    useFormik({
      //destructuring de formik
      //primero recibe los valores iniciales
      initialValues: initialValuesForm,
      //SEGUNDA PROPIEDAD Recibe el onSUbmit
      onSubmit: addNewUser,
      //validacion
      validationSchema: registerSchema,
    });
  return (
    <div className="form-container">
      <h1 className="title-register">
        ¡Bienvenido! 250.000 personas ya se han registrado antes que tú
      </h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        height={1500}
        width={900}
        m={20}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        alignContent="center"
        gap={4}
        p={2}
        sx={{ borderRadius: "10px", boxShadow: 5 }}
        bgcolor="white"
      >
        <Typography
          color="primary"
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "rigth", fontSize: "40px", mt: "20px" }}
        >
          Registro
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          justifyItems="space-evenly"
          spacing={3}
          sx={{ width: "100%", margin: 10 }}
        >
          <Box>
            <Grid item xs={12}>
              <input
                name="imgProfile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFieldValue("imgProfile", e.target.files[0]); //PARA RECOGER VALORES DE TARGET
                }}
              />
            </Grid>
          </Box>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            margin={2}
          >
            <Grid item xs={12} md={5}>
              <FormControl>
                <FormLabel
                  sx={{
                    textAlign: "left",
                    fontSize: 20,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  Sexo
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={values.gender}
                  onChange={(e) => {
                    setFieldValue("gender", e.target.value); //PARA RECOGER VALORES DE TARGET
                  }}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={5}>
              <FormControl>
                <FormLabel
                  sx={{
                    textAlign: "left",
                    fontSize: 20,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  Roll
                </FormLabel>
                <RadioGroup
                  row
                  name="role"
                  value={values.role}
                  onChange={(e) => {
                    setFieldValue("role", e.target.value); //PARA RECOGER VALORES DE TARGET
                  }}
                >
                  <FormControlLabel
                    value="Leader"
                    control={<Radio />}
                    label="Leader"
                  />
                  <FormControlLabel
                    value="Follower"
                    control={<Radio />}
                    label="Follower"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} sx={{ fontSize: "40px" }}>
            <Divider />
            <Typography component="p" sx={{ textAlign: "left", mt: "20px",padding:"10px" }}>
              {" "}
              Cual es tu edad ?
            </Typography>
            <TextField
              id="age"
              type="text"
              name="age"
              label="Edad"
              variant="outlined"
              placeholder="Tu edad"
              fullWidth
              sx={{ fontSize: "40px" }}
              value={values.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>

          <Grid item component="div" xs={12} md={9}>
            <Typography component="p" sx={{ textAlign: "left",padding:"10px" }}>
              Donde quieres ir a bailar?
            </Typography>
            <TextField
              id="location"
              name="location"
              type="text"
              label="ubicación"
              variant="outlined"
              placeholder="tu ubicacion"
              fullWidth
              value={values.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography component="p" sx={{ textAlign: "left" ,padding:"10px"}}>
              cual es tu nombre?
            </Typography>
            <TextField
              id="nameRegister"
              type="text"
              label="Nombre"
              variant="outlined"
              placeholder="tu nombre"
              fullWidth
              //   name="name"
              value={values.name} //necesito el value pero no el name para setfield
              onChange={(e) => {
                setFieldValue("name", e.target.value); //PARA RECOGER VALORES DE TARGET
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography component="p" sx={{ textAlign: "left",padding:"10px" }}>
              Cual es tu apellido?
            </Typography>
            <TextField
              id="lastnameRegister"
              type="text"
              label="Apellidos"
              variant="outlined"
              placeholder="tu apellido"
              fullWidth
              name="lastname"
              value={values.lastname} //necesito el value pero no el name apra setfiel
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Divider />
            <Box component="div">
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  textAlign: "left",
                  margin: "10px",
                }}
              >
                3.Hablanos un poco mas de ti.
              </Typography>
              <TextField
                label="Descripción"
                name="description"
                multiline
                rows={4}
                fullWidth
                sx={{ mb: "20px" }}
                placeholder="maximo 300 caracteres"
                value={values.description}
                error={!!errors.description}
                helperText={errors.description}
                onChange={handleChange}
              />
            </Box>
            <Divider />
            <Typography
              color="primary"
              variant="h6"
              align="left"
              fontWeight="bold"
              margin="10px"
            >
              4.Casi terminamos. ¿Cómo quieres iniciar sesión?
            </Typography>

            <TextField
              id="emailRegister"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TextField
              id="passRegister"
              type="password"
              label="Contraseña"
              variant="outlined"
              fullWidth
              name="password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
        <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: "40px",padding: "10px" }}
            >
              Enviar
            </Button>
          </Grid>
          </Grid>
         
        </Grid>
      </Box>
    </div>
  );
}
