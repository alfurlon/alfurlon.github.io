package learn.field_agent.domain;

import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Alias;

public class AliasService {

    private final AliasRepository repository;

    public AliasService(AliasRepository repository) {
        this.repository = repository;
    }

    public Result<Alias> add(Alias alias) {
        return null;
    }

    private Result<Alias> validate(Alias alias) {
        Result<Alias> result = new Result<>();

        if (alias == null) {
            result.addMessage("alias cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(alias.getName())) {
            result.addMessage("name is required", ResultType.INVALID);
        }

        return result;
    }
}
