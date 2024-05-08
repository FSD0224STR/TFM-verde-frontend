import React,{useState} from "react";
import { Box, Button, Grid, TextField, Typography,FormControl,FormControlLabel,FormLabel,Radio,RadioGroup } from "@mui/material";
import "./formRegister.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormRegister() {
  const [value, setValue] = useState('female');
  const handleChangeGender = (event) => {
    setValue(event.target.value);
  };

  let initialValuesForm = {
    name: "", //este valor es referente al name del input para que formik sepa donde tiene que cambiar con el onchange por eso tiene que ser igual
    lastname: "",
    email: "",
    role: "",
    password: "",
    location: "",
    // gender: {value},
    age: "",
    img: "",
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Debes ingrensar un nombre"),
    email: Yup.string().required("Debes ingrensar un email"),
    password: Yup.string().required("Debes ingrensar un password"),
    gener: Yup.string().required("Debes ingrensar un genero"),
    age: Yup.string().required("Debes ingrensar una edad"),
    location: Yup.string().required("Debes ingrensar un ubicacion"),
  });

  const handleSubmitMy = (data) => {
    console.log('entrando en el el submit')
    //esta es todo lo qeu cambio en el inicio value
    // este handle es mi funcion la que llamo en el form es una funcion propia de formik que accedo al onSubmit
    console.log(data);
  };

  const { handleChange, handleSubmit, setFieldValue, values, errors } =
    useFormik({
      //destructuring de formik
      //primero recibe los valores iniciales
      initialValues: initialValuesForm,
      //SEGUNDA PROPIEDAD Recibe el onSUbmit
      onSubmit: handleSubmitMy,
      //validacion
      validationSchema: registerSchema,
    });
  return (
    <div className="form-container">
      <Box
        component="form"
        onSubmit={handleSubmit}
        height={900}
        width={600}
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
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          justifyItems="space-evenly"
          spacing={2}
          sx={{ width: "100%", margin: 10 }}
        >
          <Typography
            color="primary"
            variant="body1"
            textAlign="left"
            fontWeight="bold"
          >
            1. Para que coincida bien con usted, necesitamos información
          </Typography>

          <Grid item xs={12} md={9}>
            <FormControl>
              <FormLabel sx={{textAlign:"left"}} >
                Gender
              </FormLabel>
              <RadioGroup
                row
                name="gender"
                value={value}
                onChange={handleChangeGender}
                
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography component="p" sx={{textAlign:"left"}}> What's your age ?</Typography>
            <TextField
              id="age"
              type="text"
              name="age"
              label="Age"
              variant="outlined"
              fullWidth
              value={values.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>

          <Grid item component="div" xs={12} md={9}>
            <Typography component="p">Where do you want to Dancing?</Typography>
            <TextField
              id="location"
              name="location"
              type="text"
              label="location"
              variant="outlined"
              fullWidth
              value={values.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography component="p" >
              What is your first name?
            </Typography>
            <TextField
              id="nameRegister"
              type="text"
              label="name"
              variant="outlined"
              fullWidth
              //   name="name"
              value={values.name} //necesito el value pero no el name apra setfiel
              onChange={(e) => {
                setFieldValue("name", e.target.value); //PARA RECOGER VALORES DE TARGET
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography
              color="primary"
              variant="h6"
              align="left"
              fontWeight="bold"
            >
              2. Almost done. How do you want to log in?
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
              label="password"
              variant="outlined"
              fullWidth
              name="password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" onClick={()=>console.log("clicando")}>
          Enviar
        </Button>
      </Box>
    </div>
  );
}
