use field_agent_test;

select 
	al.alias_id,
	al.name,
    al.persona,
    al.agent_id
from alias al
inner join agent ag on ag.agent_id = al.agent_id
where al.agent_id = ?;