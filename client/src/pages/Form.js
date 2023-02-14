import { Box, Button, TextField, Select, MenuItem, InputLabel} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE A NEW POST" subtitle="Make sure to provide appropriate syntax" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code"
                multiline
                rows={12}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 4" }}
              />
                <InputLabel id="programming-language-label">Programming Language</InputLabel>

              <Select
                fullWidth
                variant="filled"
                label="Programming Language"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.programmingLanguage}
                name="programmingLanguage"
                error={!!touched.programmingLanguage && !!errors.programmingLanguage}
                helperText={touched.programmingLanguage && errors.programmingLanguage}
                sx={{ gridColumn: "span 4" }}
              >  
              <MenuItem value="" disabled>
                    Select a language
              </MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C++">C++</MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Comment"
                multiline
                rows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.comment}
                name="comment"
                error={!!touched.comment && !!errors.comment}
                helperText={touched.comment && errors.comment}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  code: yup.string().required("required"),
  language: yup.string().required("required"),
  comment: yup.string(),
});
const initialValues = {
  title: "",
  code: "",
  language: "",
  comment: "",
};

export default Form;
