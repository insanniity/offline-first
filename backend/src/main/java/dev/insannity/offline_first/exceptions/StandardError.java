package dev.insannity.offline_first.exceptions;


import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class StandardError {

    @Getter(AccessLevel.PRIVATE)
    private final static String formato = "dd-MM-yyyy hh:mm:ss";

    @Getter(AccessLevel.PRIVATE)
    private final static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(formato);

    @Setter(AccessLevel.PRIVATE)
    private String time = simpleDateFormat.format(new Date());
    private Integer status;
    private String error;
    private String message;
    private String path;

    public StandardError(Integer status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}


