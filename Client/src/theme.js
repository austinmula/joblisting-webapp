import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';

let theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: pink,
    },
    background:{
        default:"f2f2f2",
    }, 
    typography:{
        fontFamily:'Poppins',
        fontWeightLight:500,
        fontWeightRegular:400,
        fontWeightMedium:600,
        fontWeightBold:700,
    }
})

theme=responsiveFontSizes(theme)

export default theme