import Swal from "sweetalert2";

class Notification { 

    static success = (data) => {
        return Swal.fire({
            title : "Başarılı",
            text  : data.text,
            icon  : "success",
            confirmButtonText:"Tamam",
        })
    }

    static error = (data) => {
        return Swal.fire({
            title : "Başarısız",
            text  : data.text,
            icon  : "error",
            confirmButtonText: "Tamam",
        })
    }
}

export default Notification;