package dev.insannity.offline_first.config;


import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class CustomPageableHandlerMethodArgumentResolver  extends PageableHandlerMethodArgumentResolver {


    @Override
    @NonNull
    public Pageable resolveArgument(@NonNull MethodParameter methodParameter,
                                    @Nullable ModelAndViewContainer mavContainer,
                                    @NonNull NativeWebRequest webRequest,
                                    @Nullable WebDataBinderFactory binderFactory) {
        Pageable pageable = super.resolveArgument(methodParameter, mavContainer, webRequest, binderFactory);
        // Ajusta o número da página para que comece em 1
        if (pageable.getPageNumber() > 0) {
            return PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        }
        return pageable;
    }

}
