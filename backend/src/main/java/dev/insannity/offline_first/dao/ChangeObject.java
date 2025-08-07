package dev.insannity.offline_first.dao;

import java.util.ArrayList;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class ChangeObject<T> {

    @Setter(value = AccessLevel.PROTECTED)
    List<T> created = new ArrayList<>();
    @Setter(value = AccessLevel.PROTECTED)
    List<T> updated = new ArrayList<>();
    @Setter(value = AccessLevel.PROTECTED)
    List<String> deleted = new ArrayList<>();


    public void addCreated(T entity) {
        created.add(entity);
    }

    public void addUpdated(T entity) {
        updated.add(entity);
    }

    public void addDeleted(String id) {
        deleted.add(id);
    }



}
