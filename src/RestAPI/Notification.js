import Swal from "sweetalert2";

class Notification { 

    static success = (data) => {
        return Swal.fire({
            title : "Başarılı",
            text  : data,
            icon  : "success",
            confirmButtonText:"Tamam",
        })
    }

    static error = (data) => {
        return Swal.fire({
            title : "Başarısız",
            text  : data,
            icon  : "error",
            confirmButtonText: "Tamam",
        })
    }
}

export default Notification;