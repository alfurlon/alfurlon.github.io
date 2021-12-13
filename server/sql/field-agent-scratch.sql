use field_agent;

select 
	al.alias_id,
	al.name,
    al.persona,
    al.agent_id
from alias al
inner join agent ag on ag.agent_id = al.agent_id
where al.agent_id = 1;

select
	alias_id,
    name,
    persona,
    agent_id
from alias;

select count(*) from agency_agent where security_clearance_id = 1;