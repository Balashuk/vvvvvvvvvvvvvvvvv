import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckOutClient from "./CheckoutClient";

const CheckOut = () => {
    return ( <div className="p-8">
        <Container>
            <FormWrap>
                <CheckOutClient/>
            </FormWrap>
        </Container>

    </div> );
}
 
export default CheckOut;