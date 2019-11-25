import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const studentsExists = await Students.findOne({ where: { email } });

    if (studentsExists) {
      return res.status(400).json({ error: 'Students already exists.' });
    }

    const { id, name, idade, peso, altura } = await Students.create(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const students = await Students.findByPk(req.params.id);

    if (email !== students.email) {
      const studentsExists = await Students.findOne({ where: { email } });

      if (studentsExists) {
        return res.status(400).json({ error: 'Students already exists.' });
      }
    }

    const { id, name, idade, peso, altura } = await students.update(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentsController();
