import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
   const [formValidity, setFormValidity] = useState({
      name: true,
      street: true,
      city: true,
      postal: true,
   });
   const nameInputRef = useRef();
   const streetInputRef = useRef();
   const postalInputRef = useRef();
   const cityInputRef = useRef();

   const confirmHandler = (event) => {
      event.preventDefault();
      const enteredName = nameInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;
      const enteredPostal = postalInputRef.current.value;
      const enteredCity = cityInputRef.current.value;

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredCityIsValid = !isEmpty(enteredCity);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalIsValid = isFiveChars(enteredPostal);

      setFormValidity({
         name: enteredNameIsValid,
         street: enteredStreetIsValid,
         city: enteredCityIsValid,
         postal: enteredPostalIsValid,
      });
      const formValid =
         enteredCityIsValid &&
         enteredNameIsValid &&
         enteredPostalIsValid &&
         enteredStreetIsValid;

      if (!formValid) {
         return;
      }
      props.onConfirm({
         name: enteredName,
         street: enteredStreet,
         city: enteredCity,
         postal: enteredPostal,
      });
   };

   return (
      <form className={classes.form} onSubmit={confirmHandler}>
         <div
            className={`${classes.control} ${
               formValidity.name ? "" : classes.invalid
            }`}
         >
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formValidity.name && <p>Please Enter a valid name !</p>}
         </div>
         <div
            className={`${classes.control} ${
               formValidity.street ? "" : classes.invalid
            }`}
         >
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formValidity.street && <p>Please Enter a valid street name !</p>}
         </div>
         <div
            className={`${classes.control} ${
               formValidity.postal ? "" : classes.invalid
            }`}
         >
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef} />
            {!formValidity.postal && (
               <p>Please Enter a valid postal code [5 digits] !</p>
            )}
         </div>
         <div
            className={`${classes.control} ${
               formValidity.city ? "" : classes.invalid
            }`}
         >
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formValidity.city && <p>Please Enter a valid city name !</p>}
         </div>
         <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
         </div>
      </form>
   );
};

export default Checkout;
