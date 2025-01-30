/* eslint-disable no-unused-vars */
//------------------------------- Imports ---------------------------------------
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../components/alert";
import Modal from "../components/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
//Register the datePicker to use french lang
registerLocale("es", fr);
//------------------------------------------------------------------------------------
function UserForm() {
  //-------------------------- States ------------------------------------------------
  const [error, setError] = useState("");
  const [dateN, setDateN] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  //------------------------- Form validation schema ---------------------------------
  const schema = yup.object().shape({
    cni: yup
      .string()
      .required("Champ obligatoire")
      .min(3, "Le champ doit contenir entre 3 et 8 caractères")
      .max(8, "Le champ doit contenir entre 3 et 8 caractères")
      .matches(/^[A-Za-z]{1,2}\d+$/, {
        message: "Format invalide",
      }),
    dateNaissance: yup
      .date("Champ obligatoire")
      .required("Champ obligatoire")
      .test("age", "Date de Naissance invalide", isNotUnder18YearsOld),
  });
  //------------------- Setup the FORM using react-hook-form -------------------------
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  //------------------------------- Methods ------------------------------------------
  //Concat the month and day value with 0 when its under 10
  function concatZero(nbr) {
    return nbr < 10 ? `0${nbr}` : nbr;
  }
  //Validate age
  function isNotUnder18YearsOld(date) {
    var currentDate = new Date();
    var eighteenYearsAgo = new Date(currentDate);
    eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);
    if (eighteenYearsAgo <= date) {
      return false;
    } else {
      return true;
    }
  }
  //Change date
  const onChangeDate = (date) => {
    setDateN(date);
    setValue("dateNaissance", date);
    trigger("dateNaissance");
  };
  //Toggle the modal component to show API errors
  function toggleModal() {
    setOpen(!open);
  }
  //Api Request
  const getNewPassword = async (cni, dateNaissance) => {
    try {
      const { data } = await api.post("/account-management/reset-password", {
        cine: cni,
        dateNaissance,
      });
      return data;
    } catch (error) {
      // const messageError = error.response;
      const status = error.response
        ? error.response.status
          ? error.response.status
          : null
        : null;
      if (status == 404) {
        setError("Veuillez vérifier les données saisies !");
      } else if (status == 403) {
        setError("Votre compte a été bloqué, !");
      } else {
        setError("Un problème est survenu, merci de réessayer plus tard, !");
      }
      toggleModal();
      return error;
    }
  };
  // Form Submit
  const onSubmit = async (data) => {
    const date = new Date(data.dateNaissance);
    const cni = data.cni.toUpperCase();
    const dateNaissance = `${date.getFullYear()}-${concatZero(
      date.getMonth() + 1
    )}-${concatZero(date.getDate())} `;

    const res = await getNewPassword(cni.trim(), dateNaissance);
    if (res.password) {
      navigate("success", { state: { password: res.password } });
    }
  };
  //---------------------------------------JSX --------------------------------------------------
  return (
    <>
      <div className=" flex flex-col  justify-center items-center">
        {/* ------------------------ Show modal -------------------------- */}
        <Modal
          onClose={toggleModal}
          isOpen={open}
          message={error}
          value="Annuler"
        ></Modal>
        {/* ----------------------- Logo ---------------------------------- */}
        <img src="/images/Logo.svg" className="w-20  m-5" alt="Logo" />
        <div className=" flex flex-col justify-between items-center ">
          {/* -------------------------- Alert Message -------------------------------- */}
          {/* <img className=" mb-3 w-[100px] " src="/images/Logo.svg" alt="" /> */}
          {/* <Alert
            color="cyan"
            text="Lorem, ipsum dolor sit
        amet"
            title="Lorem ipsum"
          ></Alert> */}
          {/* <h2 className="text-2xl text-cyan-900">lorem ipsum</h2> */}
        </div>
        {/* -------------------- Start Form ----------------------------------- */}
        <form
          style={{
            width: "450px",
            height: "450px",
            justifyContent: "space-evenly",
          }}
          onSubmit={handleSubmit(onSubmit)}
          className=" my-10 relative   flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        >
          {/* ----------------------------- Form Title ----------------------------------- */}
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr bg-cyan-900 bg-clip-border text-white shadow-lg shadow-bg-cyan-900/40">
            <h3 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-white antialiased">
              Réinitialisation du Mot de Passe
            </h3>
          </div>
          <div className="mt-3 flex flex-col gap-4 p-6">
            <div className=" relative h-11 w-full min-w-[200px]">
              {/* --------------------------- CNI FIELD------------------------------------- */}
              <input
                name="cni"
                placeholder="AA123456"
                {...register("cni")}
                className="flex flex-col h-[44px] peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="ml-1.5 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none text-[12px] font-normal leading-tight text-blue-gray-400 ">
                CNI
              </label>
            </div>
            <small className="text-red-500 text-xs">
              {" "}
              {errors.cni?.message}
            </small>
            {/* --------------------------- DATE DE NAISSANCE FIELD-------------------------- */}
            <div className="mt-6 relative h-11 w-full min-w-[200px]">
              <DatePicker
                style={{ width: "100%" }}
                name="dateNaissance"
                className=" h-[44px] w-[400px] peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                selected={dateN}
                onChange={(date) => onChangeDate(date)}
                dateFormat="dd/MM/yyyy"
                onSelect={(date) => onChangeDate(date)}
                placeholderText="dd/mm/yyyy"
                locale={fr}
              />
              <label className="ml-1.5 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none text-[12px] font-normal leading-tight text-blue-gray-400 ">
                Date de Naissance
              </label>
            </div>
            <small className="text-red-500 text-xs">
              {" "}
              {errors.dateNaissance?.message}
            </small>
          </div>
          {/* ---------------------- Send Request | Form submit Button ---------------------- */}
          <div className="p-4 pt-0">
            <button
              className="  block w-full select-none rounded-lg bg-gradient-to-tr bg-cyan-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default UserForm;
