package acme.twitter.config;

import acme.twitter.config.RootConfig.WebPackage;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.core.type.filter.RegexPatternTypeFilter;

import java.util.regex.Pattern;

@Configuration
@Import({DevelopmentDataConfig.class, ProductionDataConfig.class})
@ComponentScan(basePackages = {"acme.twitter"},
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.CUSTOM, value = WebPackage.class)
        })
public class RootConfig {
    public static class WebPackage extends RegexPatternTypeFilter {
        public WebPackage() {
            super(Pattern.compile("acme\\.twitter\\.controller"));
        }
    }
}
