import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
    loginContainer: {
        padding: 50,
    },
    loginForm: {
        justifyContent: 'normal',
        minHeight: '90vh'
    },
    buttonBlock: {
        width: '100%',
        padding: 10,
    },
    loginBackground: {
        justifyContent: 'center',
        minHeight: '30vh',
        padding: 50,
    },
    loginError: {
        color: "red",
    }
}))

export default Styles
