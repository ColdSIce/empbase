package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.repository.DivisionRepository;
import com.speechpro.empbase.empbase.service.DivisionService;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DivisionServiceImpl implements DivisionService {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DivisionRepository divisionRepository;

    @Override
    public Division getById(Long id) {
        return divisionRepository.findOne(id);
    }

    @Override
    public List<Division> getAll() {
        return divisionRepository.findAll();
    }

    @Override
    public Division getTreeByRoot(Division root) {
        fillTree(root);
        return root;
    }

    private void fillTree(Division division){
        division.setDivisions(getAllByParent(division));
        division.getDivisions().forEach(this::fillTree);
    }

    @Override
    public List<Division> getAllByParent(Division division) {
        return divisionRepository.findByRootDivisionId(division.getId());
    }

    @Override
    public List<Division> getFlatByRoot(Division division) {
        List<Division> divisions = new ArrayList<>();
        fillFlatRecur(division, divisions);
        return divisions;
    }

    private void fillFlatRecur(Division division, List<Division> divisions){
        divisions.add(division);
        getAllByParent(division).forEach(d -> fillFlatRecur(d, divisions));
    }

    @Override
    public List<Employee> getEmployeesByDivision(Division division) {
        return employeeService.getByDivision(division);
    }

    @Override
    public List<Employee> getEmployeesByDivisionRecursively(Division division) {
        return getEmployeeRecur(division);
    }

    private List<Employee> getEmployeeRecur(Division division){
        List<Employee> employees = employeeService.getByDivision(division);
        getAllByParent(division).forEach(d -> employees.addAll(getEmployeeRecur(d)));
        return employees;
    }

    @Override
    public Employee getFirstHead(Division division) {
        return getFirstHeadRecur(division);
    }

    private Employee getFirstHeadRecur(Division division){
        if(division.getHead() != null) return division.getHead();
        if(division.getRootDivisionId() == null) return null;
        Division parent = getById(division.getRootDivisionId());
        if(parent == null) return null;
        return getFirstHeadRecur(parent);
    }

    @Override
    public List<Employee> getAllHeads(Division division) {
        return getHeadsRecur(division, new ArrayList<>());
    }

    private List<Employee> getHeadsRecur(Division division, List<Employee> employees){
        if(division.getHead() != null) employees.add(division.getHead());
        Division parent = getById(division.getRootDivisionId());
        if(parent == null) return employees;
        return getHeadsRecur(parent, employees);
    }

    @Override
    public Division create(Division division) {
        return divisionRepository.save(division);
    }

    @Override
    public Division update(Division division) {
        return divisionRepository.save(division);
    }

    @Override
    public void delete(Division division) {
        divisionRepository.delete(division);
    }

    @Override
    public List<Division> getByHead(Employee employee) {
        return divisionRepository.findByHead(employee);
    }
}
