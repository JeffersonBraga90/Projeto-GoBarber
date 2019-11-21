import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const students = await Students.create({
      name: 'Jefferson Corrêa Braga',
      email: 'jefferson.braga.correa@gmail.com',
      idade: '29',
      peso: 73,
      altura: 1.71,
    });
    return res.json(students);
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
        return res.status(400).json({ error: 'User already exists.' });
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
