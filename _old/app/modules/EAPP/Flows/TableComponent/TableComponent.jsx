var react = require('angular/react');
var classnames = require('classnames');

var tableFactory = function TableComponent(injector, util) {
  var FlowsMixin = require('../../Stores/FlowsMixin');
  var CheckBoxComponent = require('../../Utils/CheckBoxComponent/CheckBoxComponent')(injector,util);
  var ModalComponent = require('../../Utils/PopupComponent/modal');
  var ComboComponent = require('../../Utils/ComboComponent/ComboComponent')(injector,util);

  var Table = FixedDataTable.Table;
  var Column = FixedDataTable.Column;

  var TableComponent = React.createClass({

    mixins: [FlowsMixin],

    /**
     * Get the initial state for the component
     */
    getInitialState(){
      return {
        flows: [],
        steps: [],
        fields: [],
        variables: [],
        taItemFlow: [],
        deletedSteps: [],
        deletedFields: [],
        deletedVariables: [],
        deletedTas: [],
        addedSteps: [],
        active: 1,
        width: 0,
        selectedRow: null,
        selectedStep: null,
        empty: false,
        stepDescription: "",
        a: true,
        firstStep: null,
        display: false,
        display2: false,
        display3: false,
        display4: false,
        display5: false,
        display6: false,
        display7: false,
        delete: false,
        stepIdPopup: null,
        stepDescriptionPopup: null,
        organizationalUnitPopup: null,
        stepTypePopup: null,
        stepReminderPopup: null,
        stepDeadlinePopup: null,
        defaultNextStepIdPopup: null,
        rejectedNextStepIdPopup: null,
        isStepIdToInsert: true,
        isStepDescriptionToInsert: true,
        isStepDescriptionToInsert2: true,
        isReminderToInsert: true,
        isReminderToInsert2: true,
        isDeadlineToInsert: true,
        isDeadlineToInsert2: true,
        isDefaultNextStepIdToInsert: true,
        isDefaultNextStepIdToInsert2: true,
        isRejectedNextStepIdToInsert: true,
        isRejectedNextStepIdToInsert2: true,
        datosComboStepType: [{name:'APP'},{name:'REV'}],
        masterFields: null
      }
    },

    /**
     * On mount
     */
    componentDidMount() {
      console.log("Table Component loaded successfully");
      this.flows().actions.setPage(1);
      this.flows().actions.setSearch("");
      this.flows().actions.queryFlows();

      function setWidth() {
        if(this.isMounted()){
          this.setState({
            width: React.findDOMNode(this.refs.flowsContainer).clientWidth - 40
          });
        }
      }

      $(window).resize(setWidth.bind(this));
      setWidth.call(this);
    },

    swap(items, firstIndex, secondIndex){
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    },

    partition(items, left, right) {

      var pivot = items[Math.floor((right + left) / 2)];
      var i = left;
      var j = right;

      while (i <= j) {
        while (items[i] < pivot) {
          i++;
        }

        while (items[j] > pivot) {
          j--;
        }

        if (i <= j) {
          this.swap(items, i, j);
          i++;
          j--;
        }
      }
      return i;
    },

    quickSort(items, left, right) {

      var index;

      if (items.length > 1) {
        index = this.partition(items, left, right);

        if (left < index - 1) {
          this.quickSort(items, left, index - 1);
        }

        if (index < right) {
          this.quickSort(items, index, right);
        }
      }
      return items;
    },

    onFieldsFetch(){
      var fields = this.flows().store.getFields().map(function(t,index){
        var row = [
          index,
          t.fieldId,
          t.fieldDisplayName,
          t.fieldType,
          t.fieldSubtype,
          t.fieldMaxLength,
          t.category
        ];
        return row;
      })
      this.setState({
        fields: fields
      })
    },

    onVariablesFetch(){
      var variables = this.flows().store.getVariables().map(function(t,index){
        var row = [
          index,
          t.stepId,
          t.mapTo,
          t.varName,
          t.varValue
        ];
        return row;
      })
      this.setState({
        variables: variables
      })
    },

    onTaItemFlowFetch(){
      var taItemFlow = this.flows().store.getTaItemFlow().map(function(t,index){
        var row = [
          index,
          t.taId,
          t.organizationalUnit
        ];
        return row;
      })
      this.setState({
        taItemFlow: taItemFlow
      })
    },

    onStepsFetch(){
      var nodes = [];
      var arrows = [];
      var firstStep = this.flows().store.getSelectedRow()[6];
      var steps = this.flows().store.getSteps().map(function(t,index){
        var row = [
          index,
          t.stepId,
          t.stepDescription,
          t.organizationalUnit,
          t.stepType,
          t.stepReminder,
          t.stepDeadline,
          t.defaultNextStepId,
          t.rejectedNextStepId
        ];
        return row;
      })
      for (var i = 0; i < steps.length; i++) {
        if(steps[i][1]==firstStep){
          this.setState({
            stepDescription: steps[i][2]
          });
        }
      };
      /*var steps = this.flows().store.getSteps();
      while(firstStep!=-1){
        for (var i = 0; i < steps.length; i++) {
          if(steps[i].stepId==firstStep){
            if(nodes.length==0){
              nodes.push({"data":{"id":firstStep},"css":{"background-color":"green"}});
            }else if(nodes.length==steps.length-1){
              nodes.push({"data":{"id":firstStep},"css":{"background-color":"brown"}});
            }else{
              nodes.push({"data":{"id":firstStep}});
            }
            if(steps[i].defaultNextStepId!=-1){
              arrows.push({"data":{"id":firstStep+steps[i].defaultNextStepId,"source":firstStep,"target":steps[i].defaultNextStepId}});
            }
            firstStep = steps[i].defaultNextStepId;
            break;
          }
        };
      }*/

      this.setState({
        steps: steps,
        firstStep: firstStep
      });

      //alert(JSON.stringify(nodes, null, 4));
      //alert(JSON.stringify(arrows, null, 4));

      //var steps2 = [10, 40, 23, 45];
      //var result = this.quickSort(steps2, 0, steps2.length - 1);
      //console.log(result);
    },

    onFlowsFetch() {
      console.log("event fetched flows");
      var flows = this.flows().store.getFlows().map(function(t,index){
        var row = [
          index,
          t.flowId,
          t.flowName,
          t.flowDescription,
          t.confItem.itemId,
          t.confItem.itemDescription,
          t.firstStepId,
          t.dateCreation,
          t.userCreation,
          t.confItem.itemName,
          t.dateModified,
          t.userModified
        ];
        return row;
      })
      if(flows.length==0 && this.flows().store.getPage()>1){
        this.flows().actions.setPage(this.flows().store.getPage()-1);
        this.flows().actions.queryFlows();
      }else if(flows.length==0){
        console.log("tabla vacia");
        this.setState({
          empty: true
        });
      }else if(flows.length>0){
        this.setState({
          empty: false
        });
      }
      this.setState({
        flows: flows
      });
    },

    onFlowsUpdated(){
      this.flows().actions.queryFlows();
    },

    handleRowClick(event, index, flow){
      console.log("Row seleccionada {" + flow + "}");
      this.flows().actions.setSelectedRow(flow);
      this.setState({
        selectedRow: flow
      });
      this.flows().actions.setFlow(flow[1]);
      this.flows().actions.querySteps();
      this.flows().actions.queryFields();
      this.flows().actions.queryMasterFields();
      this.flows().actions.queryVariables();
      this.flows().actions.queryTaItemFlow();
    },

    handleRowStepClick(index, step){
      //console.log(index);
      //console.log(step);
      if(this.isMounted()){
         this.setState({
          selectedStep: index,
          display: true,
          stepIdPopup: step[1],
          stepDescriptionPopup: step[2],
          organizationalUnitPopup: step[3],
          stepTypePopup: step[4],
          stepReminderPopup: step[5],
          stepDeadlinePopup: step[6],
          defaultNextStepIdPopup: step[7],
          rejectedNextStepIdPopup: step[8],
          delete: false
        });
        this.refs.stepDescriptionToInsert.getDOMNode().value = step[2];
        this.refs.reminderToInsert.getDOMNode().value = step[5];
        this.refs.deadlineToInsert.getDOMNode().value = step[6];
        this.refs.defaultNextStepIdToInsert.getDOMNode().value = step[7];
        this.refs.rejectedNextStepIdToInsert.getDOMNode().value = step[8];
      }
    },

    handleStepDescription(){
      if(this.refs.stepDescriptionToInsert.getDOMNode().value==""){
        this.setState({
          isStepDescriptionToInsert: false
        });
      }else{
        this.setState({
          isStepDescriptionToInsert: /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.stepDescriptionToInsert.getDOMNode().value),
          stepDescriptionPopup: this.refs.stepDescriptionToInsert.getDOMNode().value
        });
      }
    },

    handleReminder(){
      if(this.refs.reminderToInsert.getDOMNode().value==""){
        this.setState({
          isReminderToInsert: false
        });
      }else{
        this.setState({
          isReminderToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.reminderToInsert.getDOMNode().value),
          stepReminderPopup: this.refs.reminderToInsert.getDOMNode().value
        });
      }
    },

    handleDeadline(){
      if(this.refs.deadlineToInsert.getDOMNode().value==""){
        this.setState({
          isDeadlineToInsert: false
        });
      }else{
        this.setState({
          isDeadlineToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.deadlineToInsert.getDOMNode().value),
          stepDeadlinePopup: this.refs.deadlineToInsert.getDOMNode().value
        });
      }
    },

    handleDefaultNextStepId(){
      if(this.refs.defaultNextStepIdToInsert.getDOMNode().value==""){
        this.setState({
          isDefaultNextStepIdToInsert: false
        });
      }else{
        this.setState({
          isDefaultNextStepIdToInsert: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.defaultNextStepIdToInsert.getDOMNode().value),
          defaultNextStepIdPopup: this.refs.defaultNextStepIdToInsert.getDOMNode().value
        });
      }
    },

    handleRejectedNextStepId(){
      if(this.refs.rejectedNextStepIdToInsert.getDOMNode().value==""){
        this.setState({
          isRejectedNextStepIdToInsert: false
        });
      }else{
        this.setState({
          isRejectedNextStepIdToInsert: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.rejectedNextStepIdToInsert.getDOMNode().value),
          rejectedNextStepIdPopup: this.refs.rejectedNextStepIdToInsert.getDOMNode().value
        });
      }
    },

    handleCheckBoxes(){
      if(this.state.firstStep==this.state.stepIdPopup){
        this.setState({
          firstStep: null
        });
      }else{
        this.setState({
          firstStep: this.state.stepIdPopup
        });
      }
      //console.log(this.state.firstStep);
    },

    handleUpdateFlow(){
      //console.log("Update Step on Table");

      //console.log(this.state.firstStep);
      //console.log(this.state.stepIdPopup);
      //console.log(this.state.stepDescriptionPopup);
      //console.log(this.state.organizationalUnitPopup);
      //console.log(this.state.stepTypePopup);
      //console.log(this.state.stepReminderPopup);
      //console.log(this.state.stepDeadlinePopup);
      //console.log(this.state.defaultNextStepIdPopup);
      //console.log(this.state.rejectedNextStepIdPopup);

      var index = this.state.selectedStep;
      var steps = this.state.steps;

      steps[index][2]=this.state.stepDescriptionPopup;
      steps[index][3]=this.state.organizationalUnitPopup;
      steps[index][4]=this.state.stepTypePopup;
      steps[index][5]=this.state.stepReminderPopup;
      steps[index][6]=this.state.stepDeadlinePopup;
      steps[index][7]=this.state.defaultNextStepIdPopup;
      steps[index][8]=this.state.rejectedNextStepIdPopup;

      this.flows().actions.savePartialSteps(steps);

      this.setState({
        display: false
      });
    },

    updateSteps(){
      this.setState({
        steps: this.flows().store.getPartialSteps()
      });
    },

    updateTable(){
      this.flows().actions.queryFlows();
      this.setState({
        selectedRow: null
      });
    },

    onFlowInserted(){
      this.updateTable();
    },

    inside(a, array){
      for (var i = 0; i < array.length; i++) {
        if(array[i]==a[0]){
          return true;
        }
      };
      return false;
    },

    emptyValueOnRow(){
      //console.log(this.state.steps);
      if(this.state.firstStep==null){
        console.log("No existe firstStep");
        this.setState({
          display3: true
        })
      }else{
        if(this.testing(this.state.steps)){
          console.log("Secuencia bien realizada");
          //Salvar datos en BD
          this.flows().actions.updateFlowPopup({"flow":this.state.selectedRow,"firstStep":this.state.firstStep});
          if(this.state.deletedSteps.length>0){
            console.log("deletear steps");
            for (var i = 0; i < this.state.deletedSteps.length; i++) {
              console.log(this.state.deletedSteps[i]);
              this.flows().actions.deleteStepPopup({"flow": this.state.selectedRow, "step": this.state.deletedSteps[i]});
            };
          }
          if(this.state.deletedFields.length>0){
            console.log("deletear fields");
            for (var i = 0; i < this.state.deletedFields.length; i++) {
              console.log(this.state.deletedFields[i]);
              this.flows().actions.deleteSpecificFlowField(this.state.deletedFields[i]);
            };
          }
          if(this.state.deletedVariables.length>0){
            console.log("deletear vars");
            for (var i = 0; i < this.state.deletedVariables.length; i++) {
              console.log(this.state.deletedVariables[i]);
              this.flows().actions.deleteSpecificStepVars(this.state.deletedVariables[i]);
            };
          }
          if(this.state.deletedTas.length>0){
            console.log("deletear tas");
            for (var i = 0; i < this.state.deletedTas.length; i++) {
              console.log(this.state.deletedTas[i]);
              this.flows().actions.deleteSpecificItemFlowTa(this.state.deletedTas[i]);
            };
          }
          for (var i = 0; i < this.state.steps.length; i++) {
            console.log(this.state.steps[i]);
            //Tener en cuenta adiciones, eliminaciones...
            if(this.inside(this.state.steps[i],this.state.addedSteps)){
              console.log("adicionar");
              this.flows().actions.setFlowId(this.state.selectedRow[1]);
              this.flows().actions.setItemId(this.state.selectedRow[4]);
              var stepToInsert = [0,this.state.steps[i][1],this.state.steps[i][2],this.state.steps[i][4],this.state.steps[i][5],this.state.steps[i][6],this.state.steps[i][7],false,this.state.steps[i][8]];
              this.flows().actions.addStepPopup(stepToInsert);
            }else{
              console.log("updatear");
              this.flows().actions.updateStepPopup({"flow":this.state.selectedRow,"step":this.state.steps[i]});  
            }
          };
          this.flows().actions.setSelectedRow(null);
          this.setState({
            selectedRow: null,
            selectedStep: null,
            deletedSteps: [],
            deletedFields: [],
            addedSteps: [],
            active: 1
          });
        }else{
          console.log("Secuencia mal realizada");
          // Mostrar popup de error
          this.setState({
            display2: true
          })
          //return;
        }
      }
    },

    onErrorWhileInsertingStep(){
      console.log("Error insertando Step");
      this.setState({
        display6: true
      })
    },

    addStep(){
      console.log("Insertar");
      this.setState({
        display5: true
      })
      /*var steps = this.state.steps;
      (this.state.reminder==undefined) ? this.state.reminder=72 : "";
      (this.state.deadline==undefined) ? this.state.deadline=24 : "";
      (this.state.defaultNextStepId==undefined) ? this.state.defaultNextStepId=-1 : "";
      (this.state.rejectedNextStepId==undefined) ? this.state.rejectedNextStepId=-1 : "";
      var row = [this.state.identifier, this.state.stepId, this.state.stepDescription, this.state.stepTypeToInsert, this.state.reminder, this.state.deadline, this.state.defaultNextStepId, this.state.firstStep, this.state.rejectedNextStepId];
      steps.push(row);*/
    },

    addField(){
      console.log("addField");
      this.setState({
        display7: true
      })
    },

    addVariable(){
      console.log("addVariable");
    },

    addTa(){
      console.log("addTa");
    },

    deleteStep(index){
      console.log("Eliminar");
      console.log(index);
      var steps = this.state.steps;
      var deletedStep = steps[index];
      var deletedSteps = this.state.deletedSteps;
      deletedSteps.push(deletedStep);
      console.log(deletedStep);
      steps.splice(index,1);
      this.setState({
        steps: steps,
        display: false,
        deletedSteps: deletedSteps
      })
    },

    deleteField(index){
      console.log("Eliminar");
      console.log(index);
      var fields = this.state.fields;
      var deletedField = fields[index];
      var deletedFields = this.state.deletedFields;
      deletedFields.push(deletedField);
      console.log(deletedField);
      fields.splice(index,1);
      this.setState({
        fields: fields,
        display: false,
        deletedFields: deletedFields
      })
    },

    deleteTas(index){
      console.log("Eliminar");
      console.log(index);
      var tas = this.state.taItemFlow;
      var deletedTa = tas[index];
      var deletedTas = this.state.deletedTas;
      deletedTas.push(deletedTa);
      console.log(deletedTa);
      tas.splice(index,1);
      this.setState({
        taItemFlow: tas,
        display: false,
        deletedTas: deletedTas
      })
    },

    deleteVariables(index){
      console.log("Eliminar");
      console.log(index);
      var variables = this.state.variables;
      var deletedVariable = variables[index];
      var deletedVariables = this.state.deletedVariables;
      deletedVariables.push(deletedVariable);
      console.log(deletedVariable);
      variables.splice(index,1);
      this.setState({
        variables: variables,
        display: false,
        deletedVariables: deletedVariables
      })
    },

    handleAddStep(){
      console.log("Save Step");
      console.log(this.state.steps);
      console.log(this.refs.stepIdToInsert.getDOMNode().value);
      console.log(this.refs.stepDescriptionToInsert2.getDOMNode().value);
      console.log(this.state.stepTypeToInsert);
      (this.refs.reminderToInsert2.getDOMNode().value=="") ? this.state.reminder=72 : this.state.reminder=this.refs.reminderToInsert2.getDOMNode().value;
      console.log(this.state.reminder);
      (this.refs.deadlineToInsert2.getDOMNode().value=="") ? this.state.deadline=24 : this.state.deadline=this.refs.deadlineToInsert2.getDOMNode().value;
      console.log(this.state.deadline);
      (this.refs.defaultNextStepIdToInsert2.getDOMNode().value=="") ? this.state.defaultNextStepId=-1 : this.state.defaultNextStepId=this.refs.defaultNextStepIdToInsert2.getDOMNode().value;
      (this.refs.rejectedNextStepIdToInsert2.getDOMNode().value=="") ? this.state.rejectedNextStepId=-1 : this.state.rejectedNextStepId=this.refs.rejectedNextStepIdToInsert2.getDOMNode().value;
      console.log(this.state.defaultNextStepId);
      console.log(this.state.rejectedNextStepId);

      var max=0;
      var error=false;
      for (var i = 0; i < this.state.steps.length; i++) {
        if(this.state.steps[i][0]>max){
          max=this.state.steps[i][0];
        }
        if(this.refs.stepIdToInsert.getDOMNode().value==this.state.steps[i][1]){
          error=true;
          this.setState({
            display6: true,
            display5: false
          })
        }
      };
      console.log(max);

      if(error){
        console.log("error");
      }else{
        var steps = this.state.steps;
        var row = [max+1, this.refs.stepIdToInsert.getDOMNode().value, this.refs.stepDescriptionToInsert2.getDOMNode().value, "",this.state.stepTypeToInsert, this.state.reminder, this.state.deadline, this.state.defaultNextStepId, this.state.rejectedNextStepId];
        var addedStep = max+1;
        var addedSteps = this.state.addedSteps;
        addedSteps.push(addedStep);
        steps.push(row);
        this.setState({
          steps: steps,
          display5: false,
          addedSteps: addedSteps
        })
      }
    },

    handleStepId(){
      if(this.refs.stepIdToInsert.getDOMNode().value==""){
        this.setState({
          isStepIdToInsert: false
        });
      }else{
        this.setState({
          isStepIdToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.stepIdToInsert.getDOMNode().value)//,
          //stepId: this.refs.stepIdToInsert.getDOMNode().value
        });
      }
    },

    handleStepDescription2(){
      if(this.refs.stepDescriptionToInsert2.getDOMNode().value==""){
        this.setState({
          isStepDescriptionToInsert2: false
        });
      }else{
        this.setState({
          isStepDescriptionToInsert2: /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.stepDescriptionToInsert2.getDOMNode().value)//,
          //stepDescription: this.refs.stepDescriptionToInsert.getDOMNode().value
        });
      }
    },

    handleReminder2(){
      if(this.refs.reminderToInsert2.getDOMNode().value==""){
        this.setState({
          isReminderToInsert2: false
        });
      }else{
        this.setState({
          isReminderToInsert2: /^[0-9]{1,5}$|^$/.test(this.refs.reminderToInsert2.getDOMNode().value)//,
          //reminder: this.refs.reminderToInsert.getDOMNode().value
        });
      }
    },

    handleDeadline2(){
      if(this.refs.deadlineToInsert2.getDOMNode().value==""){
        this.setState({
          isDeadlineToInsert2: false
        });
      }else{
        this.setState({
          isDeadlineToInsert2: /^[0-9]{1,5}$|^$/.test(this.refs.deadlineToInsert2.getDOMNode().value)//,
          //deadline: this.refs.deadlineToInsert.getDOMNode().value
        });
      }
    },

    handleDefaultNextStepId2(){
      if(this.refs.defaultNextStepIdToInsert2.getDOMNode().value==""){
        this.setState({
          isDefaultNextStepIdToInsert2: false
        });
      }else{
        this.setState({
          isDefaultNextStepIdToInsert2: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.defaultNextStepIdToInsert2.getDOMNode().value)//,
          //defaultNextStepId: this.refs.defaultNextStepIdToInsert.getDOMNode().value
        });
      }
    },

    handleRejectedNextStepId2(){
      if(this.refs.rejectedNextStepIdToInsert2.getDOMNode().value==""){
        this.setState({
          isRejectedNextStepIdToInsert2: false
        });
      }else{
        this.setState({
          isRejectedNextStepIdToInsert2: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.rejectedNextStepIdToInsert2.getDOMNode().value)//,
          //rejectedNextStepId: this.refs.rejectedNextStepIdToInsert.getDOMNode().value
        });
      }
    },

    handleChangeOnComboStepTypeToInsert(dato){
      console.log("CAMBIO EN COMBO STEP TYPE TO INSERT: "+dato);
      this.setState({
        stepTypeToInsert: dato
      });
    },

    handleCloseErrorSequencepopup(){
      this.setState({
        display2: false
      })
    },

    handleCloseErrorFirstSteppopup(){
      this.setState({
        display3: false
      })
    },

    handleCloseErrorUpdating(){
      this.setState({
        display4: false
      })
    },

    handleCloseErrorStepIdExists(){
      this.setState({
        display6: false
      })
    },

    onErrorWhileUpdating(){
      console.log("Error while updating");
    },

    onMasterFieldsFetch(){
      this.setState({
        masterFields: this.flows().store.getMasterFields()
      })
    },

    testing(data){
      var fs = this.state.firstStep;
      var aux = null;
      for (var i = 0; i < data.length; i++) {
        if(data[i][1]==fs){
          aux=data[i];
        }
      };
      var num = 0;
      var exit=true;
      var flag;

      while(exit){
        flag=false;
        for (var i = 0; i < data.length; i++) {
          if(data[i][0]!=aux[0]){
            if((aux[7]==data[i][1] && flag==false)||(aux[7]==-1 && flag==false)){
              flag=true;
              num++;
              if(aux[7]!=-1){
                aux=data[i];
              }else{
                exit=false;
              }
            }
          }
        };
        if(flag==false) return false;
      }
      if(aux[7]==-1 && num==data.length){
        return true;
      }else{
        return false;
      }
    },

    getRenderer(value, column, colData, row){
      var selectedValue;
      (value==this.state.firstStep) ? selectedValue=true : selectedValue=false;
      //console.log("reset value on table: "+selectedValue);
      return React.addons.createFragment({
        cellData: <div><CheckBoxComponent selected={selectedValue}/>{value}</div>
      })
    },

    getRenderer2(value, column, colData, row){
      return React.addons.createFragment({
        cellData: value + " days"
      })
    },

     getRenderer3(value, column, colData, row){
      var valor = "";
      if(value==-1){
        valor="Final Step";
      }else{
        for (var i = 0; i < this.state.steps.length; i++) {
          if(this.state.steps[i][1]==value){
            valor=this.state.steps[i][2];
          }
        };
      }
      return React.addons.createFragment({
        cellData: valor + " (" + value + ")"
      })
    },

    getRenderer4(value, column, colData, row){
      var valor;
      (value=="APP") ? valor="Approval" : valor="Revision";
      return React.addons.createFragment({
        cellData: valor
      })
    },

    getRenderer5(value, column, colData, row){
      var valor = "";
      if(value==-1){
        valor="None";
      }else{
        for (var i = 0; i < this.state.steps.length; i++) {
          if(this.state.steps[i][1]==value){
            valor=this.state.steps[i][2];
          }
        };
      }
      return React.addons.createFragment({
        cellData: valor + " (" + value + ")"
      })
    },

    getRenderForStepActions(value, column, colData, row){
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-edit" onClick={this.handleRowStepClick.bind(this,row,colData)}></span><span className="glyphicon glyphicon-trash" onClick={this.deleteStep.bind(this,row)}></span></div>
      })
    },

    getRenderForFieldsActions(value, column, colData, row){
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-trash" onClick={this.deleteField.bind(this,row)}></span></div>
      })
    },

    getRenderForVariablesActions(value, column, colData, row){
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-trash" onClick={this.deleteVariables.bind(this,row)}></span></div>
      })
    },

    getRenderForTaActions(value, column, colData, row){
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-trash" onClick={this.deleteTas.bind(this,row)}></span></div>
      })
    },

    closeEditPopup(){
      this.setState({
        display: false,
        display2: false,
        display3: false,
        display4: false,
        display5: false,
        display6: false,
        display7: false
      });
    },

    test(){
      console.log("aaaaaaaaaaaaaaaaa");
    },

    /*setClass(){
      //var shadowness = this.state.selectedRow ? 'background-color: #FFF3E0!important' : "";
      var shadowness = this.state.selectedRow ? 'shadowness' : "";
      //console.log(shadowness);
      return shadowness;
    },*/

    /**
     * Rendering method
     */
    render() {
      //Edit Popup

      /*<div>{this.state.stepIdPopup}</div>
      <div>{this.state.stepDescriptionPopup}</div>
      <div>{this.state.organizationalUnitPopup}</div>
      <div>{this.state.stepTypePopup}</div>
      <div>{this.state.stepReminderPopup}</div>
      <div>{this.state.stepDeadlinePopup}</div>
      <div>{this.state.defaultNextStepIdPopup}</div>
      <div>{this.state.rejectedNextStepIdPopup}</div>
      <div>{this.state.steps}</div>*/

      var header = <div>Edit Step Dialog</div>
      var body = <div>
                  <div className="one">
                      <span>Step id</span><input className="smallBox" disabled="true" value={this.state.stepIdPopup}/>
                      <span>*Step Description</span><input className={(this.state.isStepDescriptionToInsert) ? '' : 'error'} ref="stepDescriptionToInsert" onChange={this.handleStepDescription} required/>
                    </div>
                    <div className="two">
                      <ComboComponent saveData="name" display="name" comboText="*Step Type" comboData={this.state.datosComboStepType} changeHandler={this.handleChangeOnComboStepTypeToInsert}/>
                      <input ref="firstStep" checked={this.state.firstStep==this.state.stepIdPopup} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required />
                    </div>
                    <div className="one">
                      <span>Reminder</span><input className={(this.state.isReminderToInsert) ? 'smallBox' : 'smallBox error'} ref="reminderToInsert" onChange={this.handleReminder}/>
                      <span>Deadline</span><input className={(this.state.isDeadlineToInsert) ? '' : 'error'} ref="deadlineToInsert" onChange={this.handleDeadline}/>
                      <span>Default Next Step Id</span><input className={(this.state.isDefaultNextStepIdToInsert) ? 'smallBox' : 'smallBox error'} ref="defaultNextStepIdToInsert" onChange={this.handleDefaultNextStepId}/>
                      <span>Rejected Next Step Id</span><input className={(this.state.isRejectedNextStepIdToInsert) ? '' : 'error'} ref="rejectedNextStepIdToInsert" onChange={this.handleRejectedNextStepId}/>
                    </div>
                 </div>
      var footer = <div><button className="popup-button black-color" onClick={this.handleUpdateFlow}>SAVE</button></div>

      var modalProps = {
        header: header,
        body: body,
        footer: footer
      }

      //Sequence Error
      var header2 = <div>Error</div>
      var body2 = <div>Error in the sequence of steps</div>
      var footer2 = <div><button className="popup-button black-color" onClick={this.handleCloseErrorSequencepopup}>SAVE</button></div>

      var modalProps2 = {
        header: header2,
        body: body2,
        footer: footer2
      }

      //FirstStepId Error
      var header3 = <div>Error</div>
      var body3 = <div>Error: There is no firstStep defined</div>
      var footer3 = <div><button className="popup-button black-color" onClick={this.handleCloseErrorFirstSteppopup}>SAVE</button></div>

      var modalProps3 = {
        header: header3,
        body: body3,
        footer: footer3
      }

      //Error while updating
      var header4 = <div>Error</div>
      var body4 = <div>An error ocurred while updating</div>
      var footer4 = <div><button className="popup-button black-color" onClick={this.handleCloseErrorUpdating}>SAVE</button></div>

      var modalProps4 = {
        header: header4,
        body: body4,
        footer: footer4
      }

      //Popup for adding step
      var header5 = <div>Add Step Dialog</div>
      var body5 = <div>
                    <div className="one">
                      <span>*Step id</span><input className={(this.state.isStepIdToInsert) ? 'smallBox' : 'smallBox error'} ref="stepIdToInsert" onChange={this.handleStepId} required/>
                      <span>*Step Description</span><input className={(this.state.isStepDescriptionToInsert2) ? '' : 'error'} ref="stepDescriptionToInsert2" onChange={this.handleStepDescription2} required/>
                    </div>
                    <div className="two">
                      <ComboComponent saveData="name" display="name" comboText="*Step Type" comboData={this.state.datosComboStepType} changeHandler={this.handleChangeOnComboStepTypeToInsert}/>
                    </div>
                    <div className="one">
                      <span>Reminder</span><input className={(this.state.isReminderToInsert2) ? 'smallBox' : 'smallBox error'} ref="reminderToInsert2" onChange={this.handleReminder2}/>
                      <span>Deadline</span><input className={(this.state.isDeadlineToInsert2) ? '' : 'error'} ref="deadlineToInsert2" onChange={this.handleDeadline2}/>
                      <span>Default Next Step Id</span><input className={(this.state.isDefaultNextStepIdToInsert2) ? 'smallBox' : 'smallBox error'} ref="defaultNextStepIdToInsert2" onChange={this.handleDefaultNextStepId2}/>
                      <span>Rejected Next Step Id</span><input className={(this.state.isRejectedNextStepIdToInsert2) ? '' : 'error'} ref="rejectedNextStepIdToInsert2" onChange={this.handleRejectedNextStepId2}/>
                    </div>
                  </div>
      var footer5 = <div><button className="popup-button black-color" onClick={this.handleAddStep}>SAVE</button></div>

      var modalProps5 = {
        header: header5,
        body: body5,
        footer: footer5
      }

      //Step Exists Error
      var header6 = <div>Error</div>
      var body6 = <div>Error: There exits an Step with the same Id</div>
      var footer6 = <div><button className="popup-button black-color" onClick={this.handleCloseErrorStepIdExists}>SAVE</button></div>

      var modalProps6 = {
        header: header6,
        body: body6,
        footer: footer6
      }

      //Popup for adding fields
      var header7 = <div>Add Field Dialog</div>
      var body7 = <div></div>
      var footer7 = <div><button className="popup-button black-color" onClick={this.handleAddStep}>SAVE</button></div>

      var modalProps7 = {
        header: header7,
        body: body7,
        footer: footer7
      }

      return (
        <div ref="flowsContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
          <div width="100%">
            <h1 className="black-color"><span className="glyphicon glyphicon-tasks marginRight white-color icon-radius"></span>Results</h1>
          </div>
          <div className="margin-for-table">
            {this.state.selectedRow ? <div>
              <div className="inside">
                <div className="col-md-4">
                  <div className="info-data-table">
                    <div className="fixed-word-lenght">
                      <div className="title-center-detail"><u><b>Flow Data</b></u></div>
                      <div><b>Flow Id</b>: {this.state.selectedRow[1]}</div>
                      <div><b>Flow Name</b>: {this.state.selectedRow[2]}</div>
                      <div><b>Flow Description</b>: {this.state.selectedRow[3]}</div>
                      <div><b>First Step Id</b>: {this.state.stepDescription}&nbsp;({this.state.selectedRow[6]})</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-data-table">
                    <div className="fixed-word-lenght">
                      <div className="title-center-detail"><u><b>Audit</b></u></div>
                      <div><b>User Creation</b>: {this.state.selectedRow[8]}</div>
                      <div><b>Date Creation</b>: {this.state.selectedRow[7]}</div>
                      {this.state.selectedRow[10] ? <div><b>Date Modified</b>: {this.state.selectedRow[10]}</div> : ""}
                      {this.state.selectedRow[11] ? <div><b>User Modified</b>: {this.state.selectedRow[11]}</div> : ""}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-data-table">
                    <div className="fixed-word-lenght">
                      <div className="title-center-detail"><u><b>Item Data</b></u></div>
                      <div><b>Item Id</b>: {this.state.selectedRow[4]}</div>
                      <div><b>Item Name</b>: {this.state.selectedRow[9]}</div>
                      <div><b>Item Description</b>: {this.state.selectedRow[5]}</div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs">
                <li role="presentation" className={(this.state.active==1) ? 'active' : ''}><a onClick={function(){this.setState({active:1});}.bind(this)}>Steps</a></li>
                <li role="presentation" className={(this.state.active==2) ? 'active' : ''}><a onClick={function(){this.setState({active:2});}.bind(this)}>Fields</a></li>
                <li role="presentation" className={(this.state.active==3) ? 'active' : ''}><a onClick={function(){this.setState({active:3});}.bind(this)}>Variables</a></li>
                <li role="presentation" className={(this.state.active==4) ? 'active' : ''}><a onClick={function(){this.setState({active:4});}.bind(this)}>Therapeutical Areas</a></li>
              </ul>
              {this.state.active==1 ? <div className="button-detail col-md-12 info-data-table"><div className="title-center-detail"><u><b></b></u></div>
              <div><div className="header-buttons-admin"><button className="popup-button black-color" onClick={this.addStep}>Add Step</button></div>
              {this.state.steps.length>0 ? <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.steps.length}
              rowHeight={50}
              headerHeight={40}
              rowGetter={function(rowIndex) {return this.state.steps[rowIndex]; }.bind(this)}>
                <Column isResizable={false} cellRenderer={this.getRenderer} dataKey={1} width={100} label="Step Id"/>
                <Column isResizable={false} dataKey={2} width={100} flexGrow={1} label="Step Description"/>
                <Column isResizable={false} dataKey={3} width={100} label="Organizational Unit"/>
                <Column isResizable={false} cellRenderer={this.getRenderer4} dataKey={4} width={100} label="Step Type"/>
                <Column isResizable={false} cellRenderer={this.getRenderer2} dataKey={5} width={100} label="Step Reminder"/>
                <Column isResizable={false} cellRenderer={this.getRenderer2} dataKey={6} width={100} label="Step Deadline"/>
                <Column isResizable={false} cellRenderer={this.getRenderer3} dataKey={7} width={100} label="Default Next Step Id"/>
                <Column isResizable={false} cellRenderer={this.getRenderer5} dataKey={8} width={100} label="Rejected Next Step Id"/>
                <Column isResizable={false} cellRenderer={this.getRenderForStepActions} width={100} label="Actions"/>
            </Table> : <div>There is no steps</div>}</div></div> : ""}
              {this.state.active==2 ? <div className="button-detail col-md-12 info-data-table"><div className="title-center-detail"><u><b></b></u></div>
              <div><div className="header-buttons-admin"><button className="popup-button black-color" onClick={this.addField}>Add Field</button></div>
              {this.state.fields.length>0 ? <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.fields.length}
              rowHeight={50}
              headerHeight={40}
              rowGetter={function(rowIndex) {return this.state.fields[rowIndex]; }.bind(this)}>
                <Column isResizable={false} dataKey={1} width={100} label="Field Id"/>
                <Column isResizable={false} dataKey={2} width={100} label="Field Name"/>
                <Column isResizable={false} dataKey={3} width={100} label="Field Type"/>
                <Column isResizable={false} dataKey={4} width={100} label="Field Sub Type"/>
                <Column isResizable={false} dataKey={5} width={100} label="Field Max Length"/>
                <Column isResizable={false} dataKey={6} width={100} flexGrow={1} label="Category"/>
                <Column isResizable={false} cellRenderer={this.getRenderForFieldsActions} width={100} label="Actions"/>
            </Table> : <div>There is no fields</div>}</div></div> : ""}
              {this.state.active==3 ? <div className="button-detail col-md-12 info-data-table"><div className="title-center-detail"><u><b></b></u></div>
              <div><div className="header-buttons-admin"><button className="popup-button black-color" onClick={this.addVariable}>Add Variables</button></div>
              {this.state.variables.length>0 ? <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.variables.length}
              rowHeight={50}
              headerHeight={40}
              rowGetter={function(rowIndex) {return this.state.variables[rowIndex]; }.bind(this)}>
                <Column isResizable={false} dataKey={1} width={100} label="Step Id"/>
                <Column isResizable={false} dataKey={2} width={100} label="Map To"/>
                <Column isResizable={false} dataKey={3} width={200} label="Var Name"/>
                <Column isResizable={false} dataKey={4} width={200} flexGrow={1} label="Var Value"/>
                <Column isResizable={false} cellRenderer={this.getRenderForVariablesActions} width={100} label="Actions"/>
            </Table> : <div>There is no variables</div>}</div></div> : ""}
              {this.state.active==4 ? <div className="button-detail col-md-12 info-data-table"><div className="title-center-detail"><u><b></b></u></div>
              <div><div className="header-buttons-admin"><button className="popup-button black-color" onClick={this.addTa}>Add Ta</button></div>
              {this.state.taItemFlow.length>0 ? <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.taItemFlow.length}
              rowHeight={50}
              headerHeight={40}
              rowGetter={function(rowIndex) {return this.state.taItemFlow[rowIndex]; }.bind(this)}>
                <Column isResizable={false} dataKey={1} width={100} label="Ta Id"/>
                <Column isResizable={false} dataKey={2} width={100} flexGrow={1} label="Organizational Unit"/>
                <Column isResizable={false} cellRenderer={this.getRenderForTaActions} width={100} label="Actions"/>
            </Table> : <div>There is no taItemFlow</div>}</div></div> : ""}
              <div className="header-buttons-admin"><button className="popup-button black-color button-detail" onClick={this.emptyValueOnRow}>Return to Table</button></div>
              </div> : <Table
              maxHeight={440}
              width={this.state.width}
              rowsCount={this.state.flows.length}
              rowHeight={50}
              headerHeight={40}
              onRowClick={this.handleRowClick}
              //cellClassName={this.setClass()}
              rowGetter={function(rowIndex) {return this.state.flows[rowIndex]; }.bind(this)}>
                <Column isResizable={false} dataKey={1} width={100} label="Flow Id"/>
                <Column isResizable={false} dataKey={2} width={100} label="Flow Name"/>
                <Column isResizable={false} dataKey={3} width={100} flexGrow={1} label="Flow Description"/>
                <Column isResizable={false} dataKey={5} width={100} label="Item Description"/>
                <Column isResizable={false} dataKey={6} width={100} label="First Step Id"/>
                <Column isResizable={false} dataKey={7} width={100} label="Date Creation"/>
                <Column isResizable={false} dataKey={8} width={100} label="User Creation"/>
            </Table>}
          </div>
          {this.state.empty ? "No data to display" : ""}
          <ModalComponent {...modalProps} display={this.state.display} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps2} display={this.state.display2} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps3} display={this.state.display3} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps4} display={this.state.display4} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps5} display={this.state.display5} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps6} display={this.state.display6} update={this.closeEditPopup}/>
          <ModalComponent {...modalProps7} display={this.state.display7} update={this.closeEditPopup}/>
        </div>
      )
    }
  });

  return TableComponent;

}

module.exports = tableFactory;
