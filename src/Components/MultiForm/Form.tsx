import { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { Formik, Form as Forms, Field, ErrorMessage,FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

export const Form = () => {
  const [page, setPage] = useState(0);
  const [data,setData] = useState<FormikValues>();

  const validationSchema = [Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive"),
    profession: Yup.string().required("Profession is required"),
  }),
  Yup.object().shape({
    address1: Yup.string().required("Address 1 is required"),
    address2: Yup.string().required("Address 2 is required"),
    city: Yup.string().required("City is required"),
  })
];

const currentValidationSchema = validationSchema[page];




 function _submitForm(values: FormikValues, actions:FormikHelpers<FormikValues>) {
  alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
}



function _handleSubmit(values: FormikValues, actions:FormikHelpers<FormikValues>) {
  if (page === 1) {
    setData(values)
    setPage(page + 1);
  }else if(page===2){
    _submitForm(values,actions)
  } else {
    setPage(page + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
  }
}

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <FirstForm />;
      case 1:
        return <SecondForm />;
      case 2:
        return <Result data={data}/>;
      default:
        return <FirstForm />;
    }
  };


  const goBack = () => {
    setPage(page - 1);
  };

  return (
    <>
      {/* Form Navigation details */}
      <div className="flex items-center py-8 w-auto  gap-4 text-sm">
        <div className="flex items-center gap-2">
          {page === 0 ? (
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
              1
            </div>
          ) : (
            <GrStatusGood className="text-xl" />
          )}
          Fill in Your Details
        </div>
        <div className="w-[100px] h-[1px] bg-blue-500"></div>
        <div className="flex items-center gap-2">
          {page === 1 ? (
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
              2
            </div>
          ) : (
            <GrStatusGood className="text-xl" />
          )}
          Address Details
        </div>
        <div className="w-[100px] h-[1px] bg-blue-900"></div>
        <div className="flex items-center gap-2">
          {page === 2 ? (
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
              3
            </div>
          ) : (
            <GrStatusGood className="text-xl" />
          )}
          Review And Save
        </div>
      </div>
      {/* Form */}
      <Formik
        initialValues={{
          name: "",
          age: "",
          profession: "",
          address1: "",
          address2: "",
          city: "",
        }}
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
       
          <Forms>
            <div className="">
              {conditionalComponent()}
              <div className="flex  mt-8">
                {page >= 1 && (
                  <button
                   type="button"
                    disabled={page === 0}
                    onClick={goBack}
                    className="px-4 py-2 text-sm w-max border"
                  >
                    Back
                  </button>
                )}
              
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 text-sm w-max ml-auto"
                  >
                    {page ===2?"Submit":"Next"}
                  </button>
                
              </div>
            </div>
          </Forms>
      </Formik>
    </>
  );
};

const FirstForm = () => {
  return (
    <div className="flex flex-col gap-4 w-[320px] font-sans">
      <div className="flex flex-col gap-2">
         <label htmlFor="name">Name  *</label>
         <Field name="name" type="text"  className="border py-1 px-2" />
         <ErrorMessage name="name" />
      </div>
      <div className="flex flex-col gap-2">
         <label htmlFor="age">Age *</label>
         <Field name="age" type="number"  className="border py-1 px-2" />
         <ErrorMessage name="age" />
      </div>
      <div className="flex flex-col gap-2">
         <label htmlFor="profession">Profession *</label>
         <Field name="profession" type="text"  className="border py-1 px-2" />
         <ErrorMessage name="profession" />
      </div>
    </div>
  );
};



const SecondForm = () => {
  return (
    <div className="flex flex-col gap-4 w-[320px] font-sans">
      <div className="flex flex-col gap-2">
        <label htmlFor="address1">Address1 *</label>
        <Field
          name="address1"
          type="text"
          className="border py-1 px-2"
          placeholder="Enter your Address 1"
        />
        <ErrorMessage name="address1" component="div" className="text-red-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="address2">Address2 *</label>
        <Field
          name="address2"
          type="text"
          className="border py-1 px-2"
          placeholder="Enter your Address 2"
        />
        <ErrorMessage name="address2" component="div" className="text-red-500" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="city">City *</label>
        <Field
          name="city"
          type="text"
          className="border py-1 px-2"
          placeholder="Enter your City"
        />
        <ErrorMessage name="city" component="div" className="text-red-500" />
      </div>
    </div>
  );
};

const Result = ({data}: {data?:FormikValues})=>{
  console.log(data);
  
  return <div className="flex flex-col gap-4 w-[320px] font-sans">
     <h1>Details</h1>
     <p>Name: {data?.name}</p>
     <p>Age: {data?.age}</p>
     <p>Profession: {data?.profession}</p>
     <h1>Address</h1>
     <p>{data?.address1}</p>
     <p>{data?.address2}</p>
     <p>City: {data?.city}</p>
  </div>
}