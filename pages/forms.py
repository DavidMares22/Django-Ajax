from django import forms
from django.core.exceptions import ValidationError
from .models import Room


class  RoomForm(forms.ModelForm):

    class  Meta:
        model = Room
        fields =  '__all__'

    def __init__(self, *args, **kwargs):
        super(RoomForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control' 


    def clean_name(self):
        data = self.cleaned_data['name']
        if  len(data)<3:
            raise ValidationError("At least 3 characters!")
 
        return data