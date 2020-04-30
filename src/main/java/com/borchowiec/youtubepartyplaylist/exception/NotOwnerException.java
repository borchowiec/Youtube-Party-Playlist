package com.borchowiec.youtubepartyplaylist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Can be thrown when user tried to access resource that didn't belong to this user.
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotOwnerException extends RuntimeException {
    public NotOwnerException(String msg) {
        super(msg);
    }

    public NotOwnerException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
