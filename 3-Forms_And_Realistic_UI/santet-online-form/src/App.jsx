import { useState } from "react";
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

function validate(form) {
  const errors = {};

  if (form.targetName.trim() === "") {
    errors.targetName = "Nama target harus diisi";
  }

  if (form.targetBirthplace.trim() === "") {
    errors.targetBirthplace = "Tempat lahir target harus diisi";
  }

  if (form.targetBirthdate.trim() === "") {
    errors.targetBirthdate = "Tanggal lahir target harus diisi";
  } else if (String(new Date(form.targetBirthdate)) === "Invalid Date") {
    errors.targetBirthdate = "Harus berupa tanggal";
  }

  if (form.targetAddress.trim() === "") {
    errors.targetAddress = "Alamat target harus diisi";
  }

  // if (form.targetSex.trim() === "") {
  //   errors.targetSex = "Jenis kelamin target harus dipilih";
  // }
  if (form.targetSex.trim() !== "male" && form.targetSex.trim() !== "female") {
    errors.targetSex = "Jenis kelamin target harus dipilih";
  }

  if (form.targetPhoto) {
    if (
      !form.targetPhoto.endsWith(".png") &&
      !form.targetPhoto.endsWith(".jpg")
    ) {
      errors.targetPhoto = "Foto target harus dalam format .png atau .jpg";
    }
  }

  if (
    form.santetType.trim() !== "muntahPaku" &&
    form.santetType.trim() !== "penghancurUsaha" &&
    form.santetType.trim() !== "pelet"
  ) {
    errors.santetType =
      "Jenis santet harus dipilih salah satu dari pilihan yang ada";
  }

  if (
    form.santetLevel.trim() !== "ringan" &&
    form.santetLevel.trim() !== "sedang" &&
    form.santetLevel.trim() !== "berat"
  ) {
    errors.santetLevel =
      "Level santet harus dipilih salah satu dari level yang ada";
  }

  return errors;
}

function simulateSendSantet() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        resolve()
      } else {
        reject(new Error('Maaf, server santet overload.'))
      }
    }, 2000)
  })
}

function App() {
  const [form, setForm] = useState({
    targetName: "",
    targetBirthplace: "",
    targetBirthdate: "",
    targetAddress: "",
    targetSex: "",
    targetPhoto: "",
    santetType: "",
    reason: "",
    santetLevel: "",
  });
  const [validationError, setValidationError] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sendingError, setSendingError] = useState("");
  const [isSendingSuccess, setisSendingSuccess] = useState(false);

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();

      const validateForm = validate(form);
      if (Object.keys(validateForm).length > 0) {
        console.log(form)
        console.log(validateForm)
        setValidationError(validateForm);
        return
      }

      // passed the validations
      setIsSending(true)
      setValidationError({})

      await simulateSendSantet()

      setisSendingSuccess(true)
      console.log(form);
    } catch (err) {
      setisSendingSuccess(false)
      setSendingError(err.message)
      // console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <h1>Santet Online</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="targetName">Nama Target</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              targetName: ev.target.value,
            }))
          }
          type="text"
          name="targetName"
          id="targetName"
        />
        {validationError.targetName && <p style={{ color: 'red' }}>{validationError.targetName}</p>}
        <br />
        <label htmlFor="targetBirthplace">Tempat Lahir Target</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              targetBirthplace: ev.target.value,
            }))
          }
          type="text"
          name="targetBirthplace"
          id="targetBirthplace"
        />
        {validationError.targetBirthplace && <p style={{ color: 'red' }}>{validationError.targetBirthplace}</p>}
        <br />
        <label htmlFor="targetBirthdate">Tanggal Lahir Target</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              targetBirthdate: ev.target.value,
            }))
          }
          type="date"
          name="targetBirthdate"
          id="targetBirthdate"
        />
        {validationError.targetBirthdate && <p style={{ color: 'red' }}>{validationError.targetBirthdate}</p>}
        <br />
        <label htmlFor="targetAddress">Alamat Target</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              targetAddress: ev.target.value,
            }))
          }
          type="text"
          name="targetAddress"
          id="targetAddress"
        />
        {validationError.targetAddress && <p style={{ color: 'red' }}>{validationError.targetAddress}</p>}
        <br />
        <label htmlFor="targetSex">Jenis Kelamin Target</label>
        <select
          // ref={targetSexRef}
          onChange={(ev) =>
            setForm((prevForm) => ({ ...prevForm, targetSex: ev.target.value }))
          }
          name="targetSex"
          id="targetSex"
        >
          <option value="" selected>
            Pilih Jenis Kelamin
          </option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
        {validationError.targetSex && <p style={{ color: 'red' }}>{validationError.targetSex}</p>}
        <br />
        <label htmlFor="targetPhoto">Foto Target (Opsional)</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              targetPhoto: ev.target.value,
            }))
          }
          type="file"
          name="targetPhoto"
          id="targetPhoto"
          accept=".png, jpg, .jpeg"
        />
        {validationError.targetPhoto && <p style={{ color: 'red' }}>{validationError.targetPhoto}</p>}
        <br />
        <label htmlFor="santetType">Jenis Santet</label>
        <select
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              santetType: ev.target.value,
            }))
          }
          name="santetType"
          id="santetType"
        >
          <option value="" selected>
            Pilih Jenis Santet
          </option>
          <option value="muntahPaku">Muntah Paku</option>
          <option value="penghancurUsaha">Penghancur Usaha</option>
          <option value="pelet">Pelet</option>
        </select>
        {validationError.santetType && <p style={{ color: 'red' }}>{validationError.santetType}</p>}
        <br />
        <label htmlFor="reason">Alasan (Opsional)</label>
        <input
          onChange={(ev) =>
            setForm((prevForm) => ({ ...prevForm, reason: ev.target.value }))
          }
          type="text"
          name="reason"
          id="reason"
        />
        <br />
        <label htmlFor="santetLevel">Level Santet</label>
        <select
          onChange={(ev) =>
            setForm((prevForm) => ({
              ...prevForm,
              santetLevel: ev.target.value,
            }))
          }
          name="santetLevel"
          id="santetLevel"
        >
          <option value="" selected>
            Pilih Level Santet
          </option>
          <option value="ringan">Ringan</option>
          <option value="sedang">Sedang</option>
          <option value="berat">Berat</option>
        </select>
        {validationError.santetLevel && <p style={{ color: 'red' }}>{validationError.santetLevel}</p>}
        <br />
        <button type="submit" disabled={isSending}>{isSending ? 'Mengirim Santet...' : 'Kirim Santet!'}</button>
        {(isSendingSuccess || sendingError.length > 1) && <p>{ isSendingSuccess ? 'Santet berhasil dikirim!' : `Santet gagal dikirim: ${sendingError}` }</p>}
      </form>
    </>
  );
}

export default App;
