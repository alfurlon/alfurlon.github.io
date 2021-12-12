package learn.field_agent.data;

import learn.field_agent.domain.Result;
import learn.field_agent.models.SecurityClearance;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SecurityClearanceRepository {

    List<SecurityClearance> findAll();

    SecurityClearance findById(int securityClearanceId);

    SecurityClearance add(SecurityClearance securityClearance);

    boolean update(SecurityClearance securityClearance);

    Result<SecurityClearance> deleteById(int securityClearanceId);
}
