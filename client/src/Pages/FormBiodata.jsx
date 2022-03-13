import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const biodataValidationSchema = yup.object({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().required("lastname wajib diisi"),
  email: yup.string().required("email wajib diisi"),
  dob: yup.date().required(),
  favoriteFood: yup.string().required("favorite food wajib diisi"),
});

export default function FormBiodata() {
  // cara manual buat define obj form buat disubmit
  // const [objForm, setObjForm] = useState({
  //   firstName: "",
  //     lastName: "",
  //     email: "",
  //     dob: "",
  //     favoriteFood: "",
  // })

  // karena useFormik adalah hooks, jadi dia harus dipakai didalam komponennya
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      favoriteFood: "",
    },
    onSubmit: (values) => {
      console.log("ini dari onsubmit");
      console.log(values);
      alert(JSON.stringify(values));
      // misal mau kirim data object ini ke api, panggilnya dari sini
      // fetch('http://localhost:8080/api/v1/biodata', )
    },
    validationSchema: biodataValidationSchema,
  });

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 480 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://cdni.iconscout.com/illustration/premium/thumb/free-registration-desk-1886554-1598085.png"
            alt="green iguana"
          />
        </CardActionArea>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Typography gutterBottom variant="h5" component="div">
              Form Biodata
            </Typography>
            <Grid spacing={2} container alignItems="center" direction="column">
              <Grid item>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="first name"
                  variant="standard"
                  size="small"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="last name"
                  variant="standard"
                  size="small"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  name="email"
                  label="email"
                  variant="standard"
                  size="small"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                ></TextField>
              </Grid>
              <Grid item>
                <FormLabel>Date of Birth</FormLabel>
              </Grid>
              <Grid item>
                <TextField
                  id="dob"
                  name="dob"
                  variant="standard"
                  size="small"
                  type="date"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="favoriteFood"
                  name="favoriteFood"
                  label="favorite food"
                  variant="standard"
                  size="small"
                  type="text"
                  value={formik.values.favoriteFood}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.favoriteFood &&
                    Boolean(formik.errors.favoriteFood)
                  }
                  helperText={
                    formik.touched.favoriteFood && formik.errors.favoriteFood
                  }
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

/**
 * # notes

1. membuat form dalam react
2. menggunakan formik (package untuk membantu kalian dalam membuat form)
3. yup (validation schema)

1. bikin page
2. register si page di router
3. kalau misalkan mau masukin si page tadi ditambahin ke navbar boleh
4. lengkapin page tadi, karena kita bikin page form yang dimana kita perlu si input formnya nanti buat dimasukin ke API atau mau belajar cuma handle inputnya aja, nanti langsung buat ini dulu
    1. <form handleSubmit=> nanti handleSubmitnya bakal di handle sama formik
    2. <TextField name id > name wajib ada... kalau id optional
    3. <Button type=”submit”>
    
    ```
    const formik = useFormik({
    		initialValue: {
    				firstName: "",
    				... lanjutin ...
    		},
    		onSubmit: (values) => {
    				// nanti kalau misalkan pengen ngirim data ke API, lakukan disini
    				// kalau mau cek doang, console.log aja
    				console.log(values)
    				// atau kalau mau di alert ya
    				alert(JSON.stringify(values))
    		}
    }
    ```
    
5. untuk validasi menggunakan yup
    1. bikin schema, tentukan schema yang dipakai di form seperti apa, apakah si variable adalah string? apakah boolean? apakah number? apakah date?
    2. masukkan validationSchema: namaVariableValidationSchema yang udah dibuat di dalam useFormik({})
    3. lalu implementasi si errornya di TextField
        
        ```
        error={
            formik.touched.lastName && Boolean(formik.errors.lastName)
        }
        helperText={
          formik.touched.lastName && formik.errors.lastName
        }
        ```
        
    4. kalau mau modify error message atau mau modify requirements formnya nanti bisa langsung dicek aja di dokumentasi yup gimana cara pakenya...
 */
