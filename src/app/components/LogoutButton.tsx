'use client';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {signOut} from "next-auth/react";


export default function LogoutButton({
    className = "flex items-center gap-6 border p-1 px-4 shadow",
    iconLeft = false,
    iconClasses = ''
}){
    return (
        <button onClick={()=> signOut()} className={className}>
            
            {iconLeft && (
                <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses}/>
            )}
            <span>Logout</span>
            {!iconLeft && (
                <FontAwesomeIcon icon={faRightFromBracket}  className={iconClasses}/>
            )}
        </button>
    )
}
