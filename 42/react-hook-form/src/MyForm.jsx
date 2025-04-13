import { useForm } from "react-hook-form"

export default function MyForm() { 
    const {register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input 
            type="text"
            {...register("username", {required: "username is required"})} placeholder="username" />
            {errors.username && <p>{errors.username.message}</p>}
            <br/><br/>
            <label htmlFor="email">Email</label>
            <input type="email"
            {...register("email", {required: "email is required"})} placeholder="email" />
            {errors.email && <p>{errors.email.message}</p>}
            <br/><br/>
            <button type="reset">Reset</button>
            <br/><br/>
            <button type="submit">Submit</button>
        </form>
    )
 }